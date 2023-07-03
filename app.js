const express = require('express')
const app = express()
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { requestLogger, errorHandler } = require('./utils/middleware')
app.use(express.json())
app.use(requestLogger)

const mongoose = require('mongoose')
mongoose.set("bufferTimeoutMS", 30000)

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGO_DB_URI)

mongoose.connect(config.MONGO_DB_URI)
        .then(result => logger.info('Successfully connected to MongoDB'))
        .catch((error) => logger.error(`Error: ${error}`))

app.use('/api/blogs', blogsRouter)


module.exports = app