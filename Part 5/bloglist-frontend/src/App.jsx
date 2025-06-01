import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/loginServices'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Toggleable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll()
      const sorted = allBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sorted)
    }
    fetchBlogs()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

    const incrementLikes = async (blog) => {
      try {
        const userId = typeof blog.user === 'object' && blog.user !== null ? blog.user.id : blog.user
        const newBlog = { ...blog, likes: blog.likes + 1, user: userId }
  
        const updatedBlog = await blogService.update(blog.id, newBlog)
        const updatedBlogs = blogs
          .map(b => b.id === blog.id ? updatedBlog : b)
          .sort((a, b) => b.likes - a.likes)
        setBlogs(updatedBlogs)
      } catch (error) {
        setErrorMessage('Failed to like blog')
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if(user=== null) {
    return (
      <div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <h1>Blog App</h1>
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const handleBlogCreation = async (newBlog) => {

    if (!user) {
      setErrorMessage('You must be logged in to create a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    if (!newBlog || !newBlog.title) {
      setErrorMessage('Title is required')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setNewBlog({ title: '', author: '', url: '' })
      blogFormRef.current.toggleVisibility()
      setErrorMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  return (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}

      <h1>Blog App</h1>

      <h2>blogs</h2>

      <p>{user.username} logged in</p>

      <button onClick={() => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
        setBlogs([])
      }}>logout</button>


      <Togglable buttonLabel="Add a new Blog" ref={blogFormRef}>
        <CreateBlog blogFormRef={blogFormRef} setErrorMessage={setErrorMessage} errorMessage={errorMessage} setBlogs={setBlogs} blogs={blogs} user={user} handleBlogCreation={handleBlogCreation}/>
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} errorMessage={errorMessage} setErrorMessage={setErrorMessage} user={user} incrementLikes={incrementLikes} />
        )}
    </div>
  )
}

export default App