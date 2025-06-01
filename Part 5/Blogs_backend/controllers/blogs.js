const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/', async (request, response,next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (error) {
    next(error)
  }
})


blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const blog = new Blog({
      ...request.body,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

    response.status(201).json(populatedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blogId = request.params.id

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return response.status(400).json({ error: 'Invalid ID format' })
  }

  try {
    const blog = await Blog.findById(blogId)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(403).json({ error: 'You do not have permission to delete this blog' })
    }

    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blogId = request.params.id
  let blogData = { ...request.body }

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return response.status(400).json({ error: 'Invalid ID format' })
  }

  // Prevent overwriting the user field with an object
  if (blogData.user && typeof blogData.user === 'object') {
    delete blogData.user
  }

  await userExtractor(request, response, async (err) => {
    if (err) return next(err)
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogData, {
        new: true,
        runValidators: true,
        context: 'query',
      }).populate('user', { username: 1, name: 1 })

      if (!updatedBlog) {
        return response.status(404).json({ error: 'Blog not found' })
      }

      response.json(updatedBlog)
    } catch (error) {
      next(error)
    }
  })
})
module.exports = blogsRouter