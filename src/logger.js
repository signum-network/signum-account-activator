import { config } from './config'
import winston from 'winston'
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston'

const dev = process.env.NODE_ENV === 'development'
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'signum-activation-service' },
    transports: [
        new AxiomTransport({
            token: process.env.AXIOM_TOKEN || '',
            dataset: process.env.AXIOM_DATASET,
        }),
    ],
})

// Add the console logger if we're not in production
// if (dev) {
//     logger.add(
//         new winston.transports.Console({
//             level: 'debug',
//             format: winston.format.simple(),
//         }),
//     )
// }

function log(obj, flush = false) {
    logger.log({
        level: 'info',
        message: obj.msg || '',
        ...obj,
    })
}

function verbose(obj) {
    if (config.verboseLog) {
        logger.log({
            level: 'verbose',
            message: obj.msg || '',
            ...obj,
        })
    }
}

function logError(errmsg, obj) {
    logger.log({
        level: 'error',
        message: errmsg || 'Unexpected Error',
        ...obj,
    })
}

function close() {
    return new Promise(resolve => logger.end(resolve))
}

export const Logger = {
    logError,
    log,
    verbose,
    close,
}
