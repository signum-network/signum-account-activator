import {getAccountIdFromPublicKey} from '@burstjs/crypto'
import {convertAddressToNumericId, isBurstAddress} from '@burstjs/util'

export class ActivatorService {

  validateAddressKeyPair(accountId, publicKey) {
    const verifiedAccountId = getAccountIdFromPublicKey(publicKey);
    if (verifiedAccountId !== accountId) {
      throw new Error("Account Id does not match Public Key")
    }
  }

  validate(account, publicKey) {
    const accountId = isBurstAddress(account) ? convertAddressToNumericId(account) : account;
    this.validateAddressKeyPair(accountId, publicKey)
  }
}

export const activatorService = new ActivatorService();
