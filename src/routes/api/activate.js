import { activatorService } from './__services__/ActivatorService'
import { messageResponse } from './__helpers__/messageResponse'
import { Logger } from '../../logger'

export const post = async (req, res) => {
    const { account, publickey} = req.body
    if (account && publickey) {
        try {
            await activatorService.activate(account, publickey)
            res.statusCode = 204
            Logger.log(
                {
                    success: true,
                    ...req.body,
                },
                true,
            )
            res.end()
        } catch (e) {
            res.statusCode = 400
            Logger.logError(e.message, { status: 400 })
            res.end(messageResponse(e.message))
        }
    } else {
        res.statusCode = 400
        const msg = 'Missing fields [account] and/or [publickey]'
        Logger.logError(msg, { status: 400 })
        res.end(messageResponse(msg))
    }
}
