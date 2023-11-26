import { Logger } from '../logger'
import { extractIpFromRequest } from './__helpers__/extractIpFromRequest'

export const logRequests = () => {
    return async function(req, res, next) {
        const { body, method, url, headers } = req
        const ip = extractIpFromRequest(req)
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
