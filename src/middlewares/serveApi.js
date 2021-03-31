import { isApiRequest } from './__helpers___/isApiRequest'
import rateLimit from 'express-rate-limit'
import { messageResponse } from '../routes/api/__helpers__/messageResponse'

const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 1,
    handler: function(req, res) {
        res.statusCode = 429
        res.end(
            messageResponse(
                'Too many activations per allowed time frame. Try again in a few moments!',
            ),
        )
    },
})

export const serveApi = () => (req, res, next) => {
    if (isApiRequest(req)) {
        res.setHeader('Content-Type', 'application/json')

        if (req.method.toUpperCase() !== 'GET') {
            limiter(req, res, next)
            return
        }
    }
    next()
}
