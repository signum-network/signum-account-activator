import polka from 'polka'
import { middlewares } from './middlewares'
import { config } from './config'
import { Logger } from './logger'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
const app = polka()

const maskedConfig = {
    ...config,
    accountSecret: config.accountSecret.substr(0, 4) + '*****',
}

Logger.log(maskedConfig)

app.use(...middlewares).listen(PORT, async err => {
    if (err) {
      Logger.logError(err)
    }
    await Logger.close()
})

export default app.handler
