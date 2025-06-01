const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user && await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id, // use _id for consistency
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
})

loginRouter.get('/logout', (request, response) => {
  // This endpoint is for logging out, but since JWTs are stateless,
  // we don't need to do anything here. Just return a success message.
  response.status(200).send({ message: 'Logged out successfully' })
})

module.exports = loginRouter