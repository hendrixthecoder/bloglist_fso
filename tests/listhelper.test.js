const mongoose = require('mongoose')
const listhelper = require('../utils/list_helper')
const app = require('../app')
const Blog = require('../models/blog');

const supertest = require('supertest')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = listhelper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})


describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listhelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
      const result = listhelper.totalLikes(listhelper.singleBlog)
      expect(result).toBe(4)
    })

    test('of a bigger list is calculated right', () => {
      const result = listhelper.totalLikes(listhelper.initialBlogs)
      expect(result).toBe(11)
    })
})

test('favorite blog', () => {
  
  const result = listhelper.favoriteBlog(listhelper.initialBlogs)

  expect(result).toEqual(  {
    title: 'First Note',
    author: 'First Author',
    likes: 4
  })
})

describe('author with', () => {
  test('most blogs', () => {
      const result = listhelper.mostBlogs(listhelper.initialBlogs)
  
      expect(result).toEqual({
        author: "First Author",
        blogs: 2
      })
  })
  
  test('most likes', () => {
      const result = listhelper.mostLikes(listhelper.initialBlogs)

      expect(result).toEqual({
        author: 'First Author',
        likes: 8
    })
  })
})

test('deleting a blog post', async () => {
  const blogsAtStart = await listhelper.blogsInDB()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await listhelper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

  const contents = blogsAtEnd.map(blog => blog.id)

  expect(contents).not.toContain(blogToDelete.id)
  
})

test('updating a blog post', async () => {
  const blogsAtStart = await listhelper.blogsInDB()
  const blogToUpdate = blogsAtStart[0]

  const newUpdate = { ...blogToUpdate,
    title: 'Updated Title',
    author: 'New Author',
    url: 'Some New Url'
  }

  const res = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(newUpdate)
          .expect(200)
  expect(res.body).toEqual(newUpdate)
  
})

afterAll(async () => {
  await mongoose.connection.close()
})