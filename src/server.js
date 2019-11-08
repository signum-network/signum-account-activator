import polka from 'polka'
import { middlewares } from './middlewares'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka()
    .use(...middlewares)
    .listen(PORT, err => {
        if (err) console.log('error', err)
    })
