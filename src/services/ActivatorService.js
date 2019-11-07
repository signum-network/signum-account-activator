import  {getAccountIdFromPublicKey} from '@burstjs/crypto'

export class ActivatorService {

  validateAddressKeyPair(accountId, publicKey){
      const verifiedAccountId = getAccountIdFromPublicKey(publicKey);
      if(verifiedAccountId !== accountId){
        throw new Error("Account Id does not match Public Key")
      }
  }
}

export const activatorService = new ActivatorService()
