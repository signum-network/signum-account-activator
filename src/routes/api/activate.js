import { activatorService } from './__services__/ActivatorService'
import { messageResponse } from './__helpers__/messageResponse'

export const post = async (req, res) => {

    const { account, publickey } = req.body

    if (account && publickey) {
        try {
            await activatorService.activate(account, publickey)
            res.statusCode = 204
            res.end()
        } catch (e) {
            res.statusCode = 400
            res.end(messageResponse(e.message))
        }
    } else {
        res.statusCode = 400
        res.end(messageResponse('Missing fields [account] and/or [publickey]'))
    }


}
