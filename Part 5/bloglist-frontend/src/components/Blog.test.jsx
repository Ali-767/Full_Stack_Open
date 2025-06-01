import { render, screen, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import Blog from './Blog'

test('Only renders  Title and Author', () => {
  const blog = {
    title: 'Xyz',
    author: 'test',
    url: 'test.com',
    likes: 5
  }

  render(<Blog blog={blog} blogs={[]} setBlogs={() => {}} setErrorMessage={() => {}} user={{}} />)


  expect(screen.getByText(/Xyz/)).toBeInTheDocument()
  expect(screen.getByText(/test/)).toBeInTheDocument()
  expect(screen.queryByText('test.com')).not.toBeInTheDocument()
  expect(screen.queryByText(/Likes:/i)).not.toBeInTheDocument()
})


test('URL and likes are shown when the details button is clicked', () => {
  const blog = {
    title: 'Xyz',
    author: 'test',
    url: 'test.com',
    likes: 5
  }

  render(<Blog blog={blog} blogs={[]} setBlogs={() => {}} setErrorMessage={() => {}} user={{}} />)


  const button = screen.getByText(/Expand/)
  fireEvent.click(button)


  expect(screen.getByText('URL: test.com')).toBeInTheDocument()
  expect(screen.getByText(/Likes: 5/)).toBeInTheDocument()
})
test('like button event handler is called twice when clicked twice', () => {
  const blog = {
    title: 'Xyz',
    author: 'test',
    url: 'test.com',
    likes: 5
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      blogs={[]}
      setBlogs={() => {}}
      setErrorMessage={() => {}}
      user={{}}
      increaseLikes={mockHandler}
    />
  )

  fireEvent.click(screen.getByText(/Expand/i))
  const likeButton = screen.getByRole('button', { name: /like/i })
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

test('calls event handler with correct details when new blog is created', () => {
  const createBlog = vi.fn()

  render( <CreateBlog blogFormRef={{}} setErrorMessage={() => {}} errorMessage={{}} setBlogs={() => {}} blogs={[]} user={{}} handleBlogCreation={createBlog}/>
)

  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText(/title/i), {
    target: { value: 'Test Blog Title' }
  })
  fireEvent.change(screen.getByPlaceholderText(/author/i), {
    target: { value: 'Test Author' }
  })
  fireEvent.change(screen.getByPlaceholderText(/url/i), {
    target: { value: 'http://testurl.com' }
  })

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /create blog/i }))

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com'
  })
})