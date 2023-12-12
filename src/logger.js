import { Logger as InternalAxiomLogger } from 'next-axiom'
// eslint-disable-next-line
import { config } from "./config";


const logger = new InternalAxiomLogger({
    source: 'signum-activation-service',
    autoFlush: true,
})
console.debug('Axiom Logger initialized')

function log(obj) {
    logger.info({
        message: obj.msg || '',
        ...obj,
    })
}

function verbose(obj) {
    if (config.verboseLog) {
        logger.debug({
            message: obj.msg || '',
            ...obj,
        })
    }
}

function logError(errmsg, obj) {
    logger.error({
        message: errmsg || 'Unexpected Error',
        ...obj,
    })
}

function flush() {
    return logger.flush()
}

export const Logger = {
    logError,
    log,
    verbose,
    flush,
}
