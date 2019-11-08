import { config } from '../../config'
import { ApiSettings, composeApi } from '@burstjs/core'
import { activatorService } from './__services__/ActivatorService'

const api = composeApi(new ApiSettings(config.burstNodeHost))

export const post = async (req, res) => {

    const { account, publickey } = req.body

    if (account && publickey) {
        try {
            await activatorService.activate(account, publickey)
            res.statusCode = 200
            res.end()
        } catch (e) {
            res.statusCode = 400
            res.end(e.message)
        }
    } else {
        res.statusCode = 400
        res.end('Missing fields [account] and/or [publickey]')
    }


}
