import compression from 'compression'
import sirv from 'sirv'
import { middleware as sapper } from '@sapper/server'
import { json } from 'body-parser'
import cors from 'cors'
import { serveApi } from './serveApi'
import { logRequests } from './logRequests'
import { webUIAvailable } from './webUIAvailable'
import { config } from '../config'

const dev = process.env.NODE_ENV === 'development'

export const middlewares = [
    cors(),
    compression({ threshold: 0 }),
    // serveApi(),
    json(),
    sirv('static', { dev }),
    logRequests(),
    webUIAvailable(config.webUiAvailable),
    sapper(),
]
