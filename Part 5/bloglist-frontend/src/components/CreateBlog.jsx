import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, setErrorMessage, errorMessage, blogFormRef, user, handleBlogCreation }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleBlogCreation(newBlog)
  }

  return (
    <div className="create-blog">
      <h2>Create a New Blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder='title'
            required
            value={newBlog.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder='author'
            required
            value={newBlog.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder='url'
            value={newBlog.url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  )
}

export default CreateBlog