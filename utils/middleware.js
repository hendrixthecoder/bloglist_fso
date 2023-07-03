const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info(`Method: ${req.method} - Path:${req.path} - Body: ${req.body}`)
    next()
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
}

module.exports = { requestLogger, errorHandler }