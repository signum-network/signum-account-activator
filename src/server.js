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

app.use(...middlewares).listen(PORT, err => {
    if (err) Logger.logError(err)
})

export default app.handler
