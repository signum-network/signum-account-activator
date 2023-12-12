import polka from 'polka'
import { middlewares } from './middlewares'
import { config } from './config'
import { Logger } from './logger'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
const app = polka()

const maskedConfig = {
    ...config,
    accountSecret: '*****',
}

Logger.log(maskedConfig)

app.use(...middlewares).listen(PORT, async err => {
    if (err) {
        Logger.logError(err)
    }
    await Logger.flush()
})

export default app.handler
