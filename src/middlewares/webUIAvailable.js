import { isApiRequest } from './__helpers___/isApiRequest'

export const webUIAvailable = (isAvailable) => (req, res, next) => {
    if (!isApiRequest(req) && !isAvailable) {
        res.statusCode = 404
        res.end()
    }
    else{
        next()
    }
}
