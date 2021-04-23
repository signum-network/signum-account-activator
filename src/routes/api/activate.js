import { activatorService } from './__services__/ActivatorService'
import { messageResponse } from './__helpers__/messageResponse'
import { Logger } from '../../logger'
import { Address } from '@burstjs/core'

export const post = async (req, res) => {
    let { account, publickey } = req.body

    if (!publickey && account.startsWith('BURST-')) {
        try {
            const address = Address.fromExtendedRSAddress(account)
            account = address.getAccountId()
            publickey = address.getPublicKey()
        } catch (e) {
            res.statusCode = 400
            const msg = 'Field [account] is not a valid extended RS address.'
            Logger.logError(msg, { status: 400 })
            res.end(messageResponse(msg))
        }
    }

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
