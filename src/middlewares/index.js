import compression from 'compression'
import sirv from 'sirv'
import { middleware as sapper } from '@sapper/server'
import { json } from 'body-parser'
import { serveApi } from './serveApi'
import { logRequests } from './logRequests'

const dev = process.env.NODE_ENV === 'development'

export const middlewares = [
    compression({ threshold: 0 }),
    serveApi(),
    json(),
    sirv('static', { dev }),
    logRequests(),
    sapper(),
]
