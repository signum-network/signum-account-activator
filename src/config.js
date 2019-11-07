import { config as loadConfig } from 'dotenv'

loadConfig()

export const config = {
    burstNodeHost: process.env.BURST_NODE,
}
