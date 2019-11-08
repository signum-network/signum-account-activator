import { config as loadConfig } from 'dotenv'

loadConfig()

export const config = {
    burstNodeHost: process.env.BURST_NODE,
    accountSecret: process.env.ACTIVATOR_ACCOUNT_SECRET
}
