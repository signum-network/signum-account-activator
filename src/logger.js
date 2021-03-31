import { createLogger } from 'logzio-nodejs'
import { config } from './config'

const dev = process.env.NODE_ENV === 'development'

const logger = createLogger({
    // TODO: replace this by gh secrets once pipeline is up
    token: 'tDejqmuSKonicGMRszNBwZYZGAvdHQRW',
    protocol: 'https',
    host: 'listener.logz.io',
    port: '8071',
    type: 'nodejs',
    extraFields: { app: 'burst-account-activator', dev },
})

function close() {
    logger.sendAndClose()
}

function log(obj, flush = false) {
    logger.log(obj)
    flush && close()
}

function verbose(obj) {
    config.verboseLog && log(obj)
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

export const Logger = {
    logError,
    log,
    verbose,
}
