import apiDescription from './__content__/description.openapi'

const isDev = process.env.NODE_ENV === 'development'


export const get = async (req, res) => {
    apiDescription.host = req.headers.host
    res.end(JSON.stringify(apiDescription))
}
