const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const { requestLogger, errorHandler } = require('./utils/middleware')
app.use(express.json())
app.use(requestLogger)

mongoose.connect(config.MONGO_DB_URI)
        .then(result => logger.info('Successfully connected to MongoDB'))
        .catch((error) => logger.error(`Error: ${error}`))

app.use('/api/blogs', blogsRouter)


module.exports = app