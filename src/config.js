import { config as loadConfig } from 'dotenv'

if (process.env.NODE_ENV === 'development') {
    loadConfig()
}

const isTrue = bool => bool === 'true'

const array = csl => (csl ? csl.split(',') : [])
export const config = {
    nodeHosts: process.env.SIGNUM_NODE,
    donationAccount: process.env.DONATION_ACCOUNT,
    accountSecret: process.env.ACTIVATOR_ACCOUNT_SECRET,
    activationAmount: parseFloat(process.env.ACTIVATION_AMOUNT),
    activationFee: parseFloat(process.env.ACTIVATION_FEE),
    isTestnet: isTrue(process.env.TEST_NET),
    webUiAvailable: isTrue(process.env.WEB_UI),
    verboseLog: isTrue(process.env.VERBOSE_LOG),
    redisUrl: process.env.REDIS_URL,
    logzIOApiKey: process.env.LOGZ_IO_SHIPPING_TOKEN,
    premiumIps: array(process.env.PREMIUM_IPS),
}
