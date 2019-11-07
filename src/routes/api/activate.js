import { config } from '../../config'

console.log(config.burstNodeHost)

export const post = async (req, res) => {
    res.end('ok')
}
