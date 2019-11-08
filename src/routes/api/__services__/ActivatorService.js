import { getAccountIdFromPublicKey, generateMasterKeys } from '@burstjs/crypto'
import { convertAddressToNumericId, isBurstAddress, convertNumberToNQTString } from '@burstjs/util'
import { ApiSettings, composeApi } from '@burstjs/core'
import { config } from '../../../config'

const WelcomeMessage = "Welcome to the Burst Network. The truly decentralized, public, and environment friendly blockchain platform"

export class ActivatorService {

    constructor() {
        this.burstApi = composeApi(new ApiSettings(config.burstNodeHost))
    }

    __ensureAccountId(account){
        return isBurstAddress(account) ? convertAddressToNumericId(account) : account
    }

    __validateAddressKeyPair(accountId, publicKey) {
        const verifiedAccountId = getAccountIdFromPublicKey(publicKey)
        if (verifiedAccountId !== accountId) {
            throw new Error('Account Id does not match Public Key')
        }
    }

    async __validateAccount(accountId) {
        try {
            const { publicKey } = await this.burstApi.account.getAccount(accountId)
            if (publicKey) {
                throw new Error('The account is already active')
            }
        } catch (e) {
            if (!e.data) {
                throw e
            }

            const { errorDescription } = e.data
            if (errorDescription === 'Unknown account') {
                // ok, ignore this
            } else {
                throw e
            }
        }
    }

    async __sendWelcomeMessage(accountId, publicKey){
        const {signPrivateKey, publicKey : senderPublicKey} = generateMasterKeys(process.env.ACTIVATOR_ACCOUNT_SECRET)
        await this.burstApi.message.sendMessage({
            message: WelcomeMessage,
            recipientId: accountId,
            recipientPublicKey: publicKey,
            feePlanck: convertNumberToNQTString(0.05),
            senderPrivateKey: signPrivateKey,
            senderPublicKey: senderPublicKey,
        })
    }

    async activate(account, publicKey) {
        const accountId = this.__ensureAccountId(account)
        this.__validateAddressKeyPair(accountId, publicKey)
        await this.__validateAccount(accountId)
        await this.__sendWelcomeMessage(accountId)
    }

}

export const activatorService = new ActivatorService()
