const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const api = supertest(app)

let token // declare token variable to be accessible outside
const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author One',
    url: 'http://example.com/first',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Author Two',
    url: 'http://example.com/second',
    likes: 10,
  },
]

const initialUser = {
  username: 'testuser',
  password: 'testpassword', 
  name: 'Test User',
}
before(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

  console.log('Creating initial user for testing...')

    await api
      .post('/api/users')
      .send(initialUser)
      .expect(201)

    console.log('User created successfully.')

    console.log('Logging in to get token...')

    const loginResponse = await api
      .post('/api/login')
      .send({
        username: initialUser.username,
        password: initialUser.password,
      })
      .expect(200)

    console.log('Login successful, token received.')
  assert.ok(loginResponse.body.token, 'Token should be present in login response')
    console.log('Token:', loginResponse.body.token)
    token = loginResponse.body.token
  })

  beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of initialBlogs) {
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
    }
  })

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique identifier property of blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    response.body.forEach(blog => {
      assert.ok(blog.id, 'Blog object does not have id property')
    })
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'http://example.com/new',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert.ok(titles.includes('New Blog'))
  })

  test('blog without likes defaults to 0', async () => {
    const newBlog = {
      title: 'No Likes Blog',
      author: 'Author NoLikes',
      url: 'http://example.com/nolikes',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(response.body.likes, 0)
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'No Title or URL',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
  })

  test('adding blog fails without token', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'No Token',
      url: 'http://example.com/notoken',
      likes: 3,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid and token is provided', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert.ok(!titles.includes(blogToDelete.title))
  })

  test('fails with status code 401 if token is missing', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
  })
})

describe('updating a blog', () => {
  test('succeeds in updating likes', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: blogToUpdate.likes + 1,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
  })

  test('fails with status 400 if invalid id is given', async () => {
    const invalidId = '12345invalidid'

    await api
      .put(`/api/blogs/${invalidId}`)
      .send({ likes: 10 })
      .expect(400)
  })
})

// Close Mongoose connection after tests
after(async () => {
  await mongoose.connection.close()
})
