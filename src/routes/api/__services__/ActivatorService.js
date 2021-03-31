import { generateMasterKeys, getAccountIdFromPublicKey } from '@burstjs/crypto'
import { convertAddressToNumericId, isBurstAddress, BurstValue } from '@burstjs/util'
import { ApiSettings, AttachmentMessage, composeApi } from '@burstjs/core'
import { config } from '../../../config'

const WelcomeMessage =
    'Welcome to the Burst Network. The truly decentralized, public, and environment friendly blockchain platform'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.isTestnet ? '0' : '1'

export class ActivatorService {
    constructor() {
        this.burstApi = composeApi(new ApiSettings(config.burstNodeHost))
        console.log('host:', config.burstNodeHost)
    }

    __ensureAccountId(account) {
        return isBurstAddress(account) ? convertAddressToNumericId(account) : account
    }

    __validateAddressKeyPair(accountId, publicKey) {
        const verifiedAccountId = getAccountIdFromPublicKey(publicKey)
        if (verifiedAccountId !== accountId) {
            throw new Error('Account Id does not match Public Key')
        }
    }

    __getSenderCredentials() {
        const keys = generateMasterKeys(config.accountSecret)
        return {
            id: getAccountIdFromPublicKey(keys.publicKey),
            ...keys,
        }
    }

    async __validatePendingActivation(recipientId) {
        const { id: senderId } = this.__getSenderCredentials()
        const {
            unconfirmedTransactions,
        } = await this.burstApi.account.getUnconfirmedAccountTransactions(senderId, false)
        if (unconfirmedTransactions.some(({ recipient }) => recipient === recipientId)) {
            throw new Error('Activation is pending')
        }
    }

    async __validateAccount(accountId) {
        try {
            console.log('validateAccount', accountId)
            const { publicKey } = await this.burstApi.account.getAccount({ accountId })

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

    async __sendWelcomeMessage(accountId, publicKey) {
        let { signPrivateKey, publicKey: senderPublicKey } = this.__getSenderCredentials()
        let suggestedFees = await this.burstApi.network.suggestFee()
        const sendMessageArgs = {
            message: WelcomeMessage,
            recipientId: accountId,
            recipientPublicKey: publicKey,
            feePlanck: suggestedFees.standard + '',
            senderPrivateKey: signPrivateKey,
            senderPublicKey: senderPublicKey,
        }
        await this.burstApi.message.sendMessage(sendMessageArgs)
    }

    async __sendWelcomeMessageWithAmount(accountId, publicKey, amountPlanck) {
        let { signPrivateKey, publicKey: senderPublicKey } = this.__getSenderCredentials()
        let suggestedFees = await this.burstApi.network.getSuggestedFees()
        console.debug('fees', suggestedFees.standard)
        const attachment = new AttachmentMessage({
            messageIsText: true,
            message: WelcomeMessage,
        })

        const args = {
            amountPlanck,
            attachment,
            feePlanck: suggestedFees.standard + '',
            recipientId: accountId,
            recipientPublicKey: publicKey,
            senderPrivateKey: signPrivateKey,
            senderPublicKey: senderPublicKey,
        }
        await this.burstApi.transaction.sendAmountToSingleRecipient(args)
    }

    async activate(account, publicKey) {
        const accountId = this.__ensureAccountId(account)
        this.__validateAddressKeyPair(accountId, publicKey)
        await this.__validateAccount(accountId)
        await this.__validatePendingActivation(accountId)
        // TODO: see why we have a problems here!
        // if (config.activationAmount === 0) {
        //     await this.__sendWelcomeMessage(accountId, publicKey)
        // } else {
        // const amountPlanck = convertNumberToNQTString(config.activationAmount)
        const value = BurstValue.fromBurst(0.0147)
        await this.__sendWelcomeMessageWithAmount(accountId, publicKey, value.getPlanck())
        // }
    }
}

export const activatorService = new ActivatorService()
