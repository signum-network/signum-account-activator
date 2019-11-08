import pino from 'pino'

const dev = process.env.NODE_ENV === 'development'

export const logRequests = () => {
    const logger = pino({
        name: 'BFF',
        level: dev ? 'trace' : 'error',
    })

    return function(req, res, next) {
        logger.debug(`Requested: ${req.method} on ${req.url}`)
        next()
    }
}
