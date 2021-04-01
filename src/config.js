import { config as loadConfig } from 'dotenv'

if (process.env.NODE_ENV === 'development') {
    loadConfig()
}

const isTrue = bool => bool === 'true'

export const config = {
    burstNodeHost: process.env.BURST_NODE,
    donationAccount: process.env.DONATION_ACCOUNT,
    accountSecret: process.env.ACTIVATOR_ACCOUNT_SECRET,
    activationAmount: parseFloat(process.env.ACTIVATION_AMOUNT),
    isTestnet: isTrue(process.env.TEST_NET),
    webUiAvailable: isTrue(process.env.WEB_UI),
    verboseLog: isTrue(process.env.VERBOSE_LOG),
}
