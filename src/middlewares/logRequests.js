import { Logger } from '../logger'
import { config } from '../config'

export const logRequests = () => {
    return function(req, res, next) {
        const { body, method, url, headers } = req
        const ip =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null)

        Logger.log(
            {
                headers,
                ip,
                method,
                url,
                body,
            },
            true,
        )
        next()
    }
}
