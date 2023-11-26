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
if (dev) {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    )
}

function log(obj, flush = false) {
    logger.log(obj)
}

function verbose(obj) {
    if (config.verboseLog) {
        log(obj)
    }
}

function logError(errmsg, obj) {
    log(
        {
            ...obj,
            errmsg,
        },
        true,
    )
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
