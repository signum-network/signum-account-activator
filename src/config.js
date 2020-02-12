import { config as loadConfig } from 'dotenv'

loadConfig()

const isTrue = bool => bool === 'true'

export const config = {
    burstNodeHost: process.env.BURST_NODE,
    donationAccount: process.env.DONATION_ACCOUNT,
    accountSecret: process.env.ACTIVATOR_ACCOUNT_SECRET,
    activationAmount: parseInt(process.env.ACTIVATION_AMOUNT, 10),
    isTestnet: isTrue(process.env.TEST_NET),
    webUiAvailable: isTrue(process.env.WEB_UI),
}
