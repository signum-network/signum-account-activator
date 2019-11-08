import { getAccountIdFromPublicKey } from '@burstjs/crypto'
import { convertAddressToNumericId, isBurstAddress } from '@burstjs/util'
import { ApiSettings, composeApi } from '@burstjs/core'
import { config } from '../../../config'

export class ActivatorService {

    constructor() {
        this.burstApi = composeApi(new ApiSettings(config.burstNodeHost))
    }

    validateAddressKeyPair(accountId, publicKey) {
        const verifiedAccountId = getAccountIdFromPublicKey(publicKey)
        if (verifiedAccountId !== accountId) {
            throw new Error('Account Id does not match Public Key')
        }
    }

    async validateAccount(accountId) {
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

    async validate(account, publicKey) {
        const accountId = isBurstAddress(account) ? convertAddressToNumericId(account) : account
        this.validateAddressKeyPair(accountId, publicKey)
        await this.validateAccount(accountId)
    }
}

export const activatorService = new ActivatorService()
