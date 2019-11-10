import { isApiRequest } from './__helpers___/isApiRequest'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit(
    {
        windowMs: 10 * 1000,
        max: 1,
        handler: function(req, res) {
            res.statusCode = 429;
            res.end('Too many activations per allowed time frame. Try again in a few moments!')
        },
    },
)

export const serveApi = () => (req, res, next) => {
    console.log(req.path)
    if (isApiRequest(req)) {
        res.setHeader('Content-Type', 'application/json')
        limiter(req, res, next)
    } else {
        next()
    }
}
