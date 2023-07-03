const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
    const blog = await Blog.find({})
    blog.length ? res.json(blog) : res.json({ "error": "No blog posts at this time." })
})

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    await blog.save()
    res.status(201).json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json(updatedBlog)
})

module.exports = blogsRouter