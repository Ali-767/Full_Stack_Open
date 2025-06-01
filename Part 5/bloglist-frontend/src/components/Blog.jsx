import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, blogs, setErrorMessage, user, incrementLikes }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const increaseLikes= () => incrementLikes(blog)

  const remove = async () => {
    const confirmDelete = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!confirmDelete) return

    try {
      await blogService.removes(blog.id)
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs)
    } catch (error) {
      setErrorMessage('Failed to delete blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  let blogUserId = null
  if (blog.user) {
    if (typeof blog.user === 'object' && blog.user !== null && blog.user.id) {
      blogUserId = blog.user.id
    } else if (typeof blog.user === 'string') {
      blogUserId = blog.user
    }
  }

  const canRemove = user && blogUserId && String(blogUserId) === String(user.id)
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }} className='blog'>
      {!blogVisible ? (
        <div className='Author and Title'>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>Expand</button>
        </div>
      ) : (
        <div>
          <div className='Title_v'><strong>{blog.title}</strong></div>
          <div className='Author_v'>Author: {blog.author}</div>
          <div className='Url'>URL: {blog.url}</div>
          <div className='Likes'>
            Likes: {blog.likes}
            <button onClick={increaseLikes}>like</button>
          </div>
          {canRemove && (
            <div>
              <button onClick={remove}>Remove</button>
            </div>
          )}
          <button onClick={toggleVisibility}>Hide</button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog