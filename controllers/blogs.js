const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => blogs.length ? res.json(blogs) : res.send({ "message" : "No blogposts at this time!" }))
})

blogsRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body)
    blog
        .save()
        .then(result => res.status(201).send(result.json))
        .catch((error) => next(error))
})

module.exports = blogsRouter