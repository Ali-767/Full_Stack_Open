const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/user')


usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
      return response.status(400).json({ error: 'Password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser.toJSON())
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1
  })

  response.json(users)
})

usersRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'Invalid ID format' })
  }

  try {
    const user = await User.findById(id).populate('blogs', {
      title: 1,
      author: 1,
      url: 1
    })

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }
    response.json(user.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter