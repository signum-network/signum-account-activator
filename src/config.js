import { config as loadConfig } from 'dotenv'

loadConfig()

export const config = {
    burstNodeHost: process.env.BURST_NODE,
    donationAccount: process.env.DONATION_ACCOUNT,
    accountSecret: process.env.ACTIVATOR_ACCOUNT_SECRET,
    activationAmount: parseInt(process.env.ACTIVATION_AMOUNT, 10)
}
