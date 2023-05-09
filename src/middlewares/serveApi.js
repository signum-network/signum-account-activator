import { isApiRequest } from './__helpers__/isApiRequest'
import { extractIpFromRequest } from './__helpers__/extractIpFromRequest'
import { config } from '../config'
import RateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import Redis from 'ioredis'
import { messageResponse } from '../routes/api/__helpers__/messageResponse'

const client = new Redis(config.redisUrl)

const limiter = new RateLimit({
    store: new RedisStore({
        client,
    }),
    resetExpiryOnChange: true,
    passIfNotConnected: true,
    windowMs: (process.env.NODE_ENV === 'development' ? 1 : 10) * 60 * 1000,
    max: 2,
    handler: function(req, res) {
        res.statusCode = 429
        res.end(
            messageResponse('Too many calls per allowed time frame. Try again in a few moments!'),
        )
    },
})

const premiumLimiter = new RateLimit({
    store: new RedisStore({
        client,
    }),
    resetExpiryOnChange: true,
    passIfNotConnected: true,
    windowMs: 1 * 1000,
    max: 10,
    handler: function(req, res) {
        res.statusCode = 429
        res.end(
            messageResponse('Too many calls per allowed time frame. Try again in a few moments!'),
        )
    },
})

export const serveApi = () => (req, res, next) => {
    if (isApiRequest(req)) {
        res.setHeader('Content-Type', 'application/json')
        if (req.method.toUpperCase() !== 'GET') {
            if (req.headers["x-api-key"] === process.env.PREMIUM_KEY) {
                premiumLimiter(req, res, next)
            } else {
                limiter(req, res, next)
            }
            return
        }
    }
    next()
}
