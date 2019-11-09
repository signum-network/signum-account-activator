import { isApiRequest } from './__helpers___/isApiRequest'

export const serveApi = () => (req, res, next) => {
    if (isApiRequest(req)) {
        res.setHeader('Content-Type', 'application/json')
    }
    next()
}
