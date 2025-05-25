const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  console.log(result)   
  assert.deepStrictEqual(result, 1)
})

describe('total likes', () => {
test('total likes of empty list is zero', () => {
  const blogs = []

  const result = listHelper.totalLikes(blogs)
  console.log(result)   
  assert.deepStrictEqual(result, 0)
})

test('total likes of one blog is the likes of that blog', () => {
  const blogs = [
    {
      title: 'Test Blog',  
      author: 'Test Author',
      url: 'http://testblog.com',  
      likes: 5,
    },
  ]
    const result = listHelper.totalLikes(blogs) 
    console.log(result)
    assert.deepStrictEqual(result, 5)
})

test('total likes of multiple blogs is the sum of likes', () => {
  const blogs = [
    {
      title: 'Test Blog 1',
      likes: 5,
    },
    {
      title: 'Test Blog 2',
      likes: 10,
    },
    {
      title: 'Test Blog 3',
      likes: 15,
    },
  ]
  const result = listHelper.totalLikes(blogs)
    console.log(result)
    assert.deepStrictEqual(result, 30)

})
})

describe('favorite blog', () => {
test('favorite blog of empty list is null', () => {
  const blogs = []

  const result = listHelper.favoriteBlog(blogs)
  console.log(result)   
  assert.deepStrictEqual(result, null)
})


test('favorite blog of one blog is that blog', () => {
  const blogs = [
    {
      title: 'Test Blog',
      likes: 5,
    },
]
    const result = listHelper.favoriteBlog(blogs)
        console.log(result)
        assert.deepStrictEqual(result, blogs[0])
})


test('favorite blog of multiple blogs is the one with most likes', () => {
  const blogs = [
    {
      title: 'Test Blog 1',
      likes: 5,
    },
    {
      title: 'Test Blog 2',
      likes: 10,
    },
    {
      title: 'Test Blog 3',
      likes: 15,
    },
]
    const result = listHelper.favoriteBlog(blogs)
        console.log(result)
        assert.deepStrictEqual(result, blogs[2])
    })
})

describe('most blogs', () => {

test('most blogs of empty list is null', () => {
  const blogs = []

  const result = listHelper.mostBlogs(blogs)
  console.log(result)   
  assert.deepStrictEqual(result, null)
})


test('most blogs of one blog is that blog', () => {
    const blogs = [
        {
        title: 'Test Blog',
        likes: 5,
        author: 'Test Author'
        }]
    const result = listHelper.mostBlogs(blogs)
    console.log(result)
    assert.deepStrictEqual(result, { author: 'Test Author', blogs: 1 })
})

test('most blogs of multiple blogs is the author with most blogs', () => {
  const blogs = [
    {
      title: 'Test Blog 1',
      author: 'Author 1',
      likes: 5,
    },
    {
      title: 'Test Blog 2',
      author: 'Author 2',
      likes: 10,
    },
    {
      title: 'Test Blog 3',
      author: 'Author 1',
      likes: 15,
    }]
    const result = listHelper.mostBlogs(blogs)
    console.log(result)
assert.deepStrictEqual(result, { author: 'Author 1', blogs: 2 })
})

test('most blogs of multiple blogs with same number of blogs returns one of them', () => {
  const blogs = [
    {
      title: 'Test Blog 1',
      author: 'Author 1',
        likes: 5,
    },
    {
      title: 'Test Blog 2',
      author: 'Author 2',
     likes: 10,
    },
    {
      title: 'Test Blog 3',
      author: 'Author 1',
      likes: 15,
    },
    {
      title: 'Test Blog 4',
      author: 'Author 2',
      likes: 20,
    }]
    const result = listHelper.mostBlogs(blogs)
    console.log(result)
    assert.deepStrictEqual(result, { author: 'Author 1', blogs: 2 })
})

})

describe('most likes', () => { 
test('most likes of empty list is null', () => {
  const blogs = []

  const result = listHelper.mostLikes(blogs)
  console.log(result)   
  assert.deepStrictEqual(result, null)
})
test('most likes of one blog is that blog', () => {
  const blogs = [
    {
      title: 'Test Blog',
      likes: 5,
      author: 'Test Author'
    },
    ]
    const result = listHelper.mostLikes(blogs)
    console.log(result)
    assert.deepStrictEqual(result, { author: 'Test Author', likes: 5 })
})
test('most likes of multiple blogs is the author with most likes', () => {
  const blogs = [
    {
      title: 'Test Blog 1',
      author: 'Author 1',
        likes: 5,
    },
    {
      title: 'Test Blog 2',
      author: 'Author 2',
        likes: 10,
    },
    {
      title: 'Test Blog 3',
      author: 'Author 1',
      likes: 15,
    }]
    const result = listHelper.mostLikes(blogs)
    console.log(result)
    assert.deepStrictEqual(result, { author: 'Author 1', likes: 20 })
}
)
test('most likes of multiple blogs with same number of likes returns one of them', () => {
  const blogs = [
    {
      title: 'Test Blog 1',
      author: 'Author 1',
        likes: 5,
    },
    {
      title: 'Test Blog 2',
      author: 'Author 2',
        likes: 10,
    },
    {
      title: 'Test Blog 3',
      author: 'Author 1',
        likes: 15,
    },
    {
      title: 'Test Blog 4',
      author: 'Author 2',
        likes: 20,
    }]
    const result = listHelper.mostLikes(blogs)
    console.log(result)
    assert.deepStrictEqual(result, { author: 'Author 2', likes: 30 })
})
})

