const isApiCall = req => req.path.toLowerCase().startsWith('api')

export const serveBff = () => (req, res, next) => {
    if (isApiCall(req)) {
        res.setHeader('Content-Type', 'application/json')
    }
    next()
}
