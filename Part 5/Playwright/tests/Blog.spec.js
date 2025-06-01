const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {

    await request.post('http://localhost:3003/api/test/reset')


    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        name: 'Test User',
        password: 'testpass'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /log in to application/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /username/i })).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
  await page.getByLabel(/username/i).fill('testuser')
  await page.getByLabel(/password/i).fill('testpass')
  await page.getByRole('button', { name: /login/i }).click()

  await expect(page.getByText('testuser logged in')).toBeVisible()
})

test('fails with wrong credentials', async ({ page }) => {
  await page.getByLabel(/username/i).fill('testuser')
  await page.getByLabel(/password/i).fill('wrongpass')
  await page.getByRole('button', { name: /login/i }).click()

  await expect(page.getByText(/wrong credentials/i)).toBeVisible()
  await expect(page.getByLabel(/username/i)).toBeVisible()
})
  })
describe('When logged in', () => {
  beforeEach(async ({ page }) => {

    await page.getByLabel(/username/i).fill('testuser')
    await page.getByLabel(/password/i).fill('testpass')
    await page.getByRole('button', { name: /login/i }).click()

    await expect(page.getByText('testuser logged in')).toBeVisible()
  })

  test('a new blog can be created', async ({ page }) => {

    await page.getByRole('button', { name: /Add a new blog/i }).click()

    await page.getByLabel(/title/i).fill('Playwright Blog')
    await page.getByLabel(/author/i).fill('Playwright Tester')
    await page.getByLabel(/url/i).fill('https://playwright.dev')
    await page.getByRole('button', { name: /create blog/i }).click()


    await expect(page.getByText(/playwright blog/i)).toBeVisible()
    await expect(page.getByText(/playwright tester/i)).toBeVisible()
  })

  test('a blog can be liked', async ({ page }) => {

  await page.getByRole('button', { name: /Add a new blog/i }).click()


  await page.getByLabel(/title/i).fill('Likeable Blog')
  await page.getByLabel(/author/i).fill('Like Tester')
  await page.getByLabel(/url/i).fill('https://like.test')
  await page.getByRole('button', { name: /create blog/i }).click()


  await expect(page.getByText(/likeable blog/i)).toBeVisible()


  await page.getByRole('button', { name: /Expand/i }).click()

  
  const likeButton = await page.getByRole('button', { name: /like/i })
  const likesText = page.getByText(/likes/i)

  
  const initialLikes = await likesText.textContent()
 
  await likeButton.click()


  await expect(page.locator('.Likes')).toContainText('Likes: 1')
})


test('the user who added the blog can delete the blog', async ({ page }) => {
 
   await page.getByRole('button', { name: /Add a new blog/i }).click()

  
  await page.getByLabel(/title/i).fill('Deletable Blog')
  await page.getByLabel(/author/i).fill('Delete Tester')
  await page.getByLabel(/url/i).fill('https://delete.test')
  await page.getByRole('button', { name: /create blog/i }).click()

  
  await expect(page.getByText(/deletable blog/i)).toBeVisible()

 
  await page.getByRole('button', { name: /Expand/i }).click()

 
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: /remove/i }).click();

 
  await expect(page.getByText(/deletable blog/i)).not.toBeVisible()
})

test('only the user who added the blog sees the delete button', async ({ page, request, browser }) => {
  
  await page.getByRole('button', { name: /Add a new blog/i }).click()
  await page.getByLabel(/title/i).fill('Ownership Blog')
  await page.getByLabel(/author/i).fill('Owner User')
  await page.getByLabel(/url/i).fill('https://owner.test')
  await page.getByRole('button', { name: /create blog/i }).click()
  await expect(page.getByText(/ownership blog/i)).toBeVisible()
  await page.getByRole('button', { name: /Expand/i }).click()
  
  await expect(page.getByRole('button', { name: /remove/i })).toBeVisible()

  
  await page.getByRole('button', { name: /logout/i }).click()

 
  await request.post('http://localhost:3003/api/users', {
    data: {
      username: 'seconduser',
      name: 'Second User',
      password: 'secondpass'
    }
  })

  
  await page.getByLabel(/username/i).fill('seconduser')
  await page.getByLabel(/password/i).fill('secondpass')
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page.getByText('seconduser logged in')).toBeVisible()

  
  await page.getByText(/ownership blog/i).click() // or use Expand button if needed
 
  await expect(page.getByRole('button', { name: /remove/i })).not.toBeVisible()
})

test('blogs are ordered by likes, most liked first', async ({ page }) => {
 
  await page.getByRole('button', { name: /Add a new blog/i }).click()
  await page.getByLabel(/title/i).fill('Least Liked Blog')
  await page.getByLabel(/author/i).fill('Author One')
  await page.getByLabel(/url/i).fill('https://leastliked.test')
  await page.getByRole('button', { name: /create blog/i }).click()
  await expect(page.getByText(/least liked blog/i)).toBeVisible()

  
  await page.getByLabel(/title/i).fill('Most Liked Blog')
  await page.getByLabel(/author/i).fill('Author Two')
  await page.getByLabel(/url/i).fill('https://mostliked.test')
  await page.getByRole('button', { name: /create blog/i }).click()
  await expect(page.getByText(/most liked blog/i)).toBeVisible()


  await expect(page.getByText(/least liked blog/i)).toBeVisible()
  await expect(page.getByText(/most liked blog/i)).toBeVisible()

 
  const expandCount = await page.getByRole('button', { name: /expand/i }).count()
  
  for (let i = 0; i < 2; i++) {
    await page.getByRole('button', { name: /expand/i }).first().click()
  }


  const mostLikedBlog = page.locator('.blog', { hasText: 'Most Liked Blog' })
  const mostLikedLikeButton = mostLikedBlog.getByRole('button', { name: /like/i })

  await mostLikedLikeButton.click()
  await expect(mostLikedBlog).toContainText('Likes: 1')
  await mostLikedLikeButton.click()
  await expect(mostLikedBlog).toContainText('Likes: 2')


  const leastLikedBlog = page.locator('.blog', { hasText: 'Least Liked Blog' })
  const leastLikedLikeButton = leastLikedBlog.getByRole('button', { name: /like/i })
  await leastLikedLikeButton.click()
  await expect(leastLikedBlog).toContainText('Likes: 1')
  
  await expect(page.locator('.blog').filter({ hasText: 'Most Liked Blog' })).toContainText('Likes: 2')
  await expect(page.locator('.blog').filter({ hasText: 'Least Liked Blog' })).toContainText('Likes: 1')

  
  const blogTitles = await page.locator('.blog').locator('strong').allTextContents()
  expect(blogTitles[0]).toMatch(/most liked blog/i)
  expect(blogTitles[1]).toMatch(/least liked blog/i)
})
})
})