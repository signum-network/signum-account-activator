import apiDescription from './__content__/description.openapi'

export const get = async (req, res) => {
    res.end(JSON.stringify(apiDescription))
}
