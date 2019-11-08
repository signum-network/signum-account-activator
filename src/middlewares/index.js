import compression from 'compression'
import sirv from 'sirv'
import { middleware as sapper } from '@sapper/server'
import { json } from 'body-parser'
import { serveBff } from './serveBff'
import { logRequests } from './logRequests'

const dev = process.env.NODE_ENV === 'development'

export const middlewares = [
    compression({ threshold: 0 }),
    serveBff(),
    json(),
    sirv('static', { dev }),
    logRequests(),
    sapper(),
]
