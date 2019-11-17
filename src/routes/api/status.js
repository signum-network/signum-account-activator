import { messageResponse } from './__helpers__/messageResponse'

export const get = async (req, res) => {
    res.end(messageResponse('Running fine...'))
}
