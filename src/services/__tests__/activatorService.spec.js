import {ActivatorService} from '../ActivatorService'

const TestPublicKey = '497D559D18D989B8E2D729EB6F69B70C1DDC3E554F75BEF3ED2716A4B2121902'
const TestAccountId = '16107620026796983538'
const TestAccountAddress = 'BURST-9K9L-4CB5-88Y5-F5G4Z'

describe('ActivatorService', () => {
  let service = new ActivatorService()

  describe('validateAddressIdKeyPair', () => {
    it('Should successfully validate pair', () => {
      try {
        service.validateAddressKeyPair(TestAccountId, TestPublicKey)
      } catch (e) {
        expect('No error expected').toBeFalsy()
      }
    })

    it('Should throw exception on invalid pair', () => {
      try {
        service.validateAddressKeyPair('Some Id', TestPublicKey)
        expect('No error expected').toBeFalsy()
      } catch (e) {
        expect(e.message).toMatch('Account Id does not match Public Key')
      }
    })
  })

  describe('validate', () => {
    it('Should successfully validate with RS address', () => {
      try {
        service.validate(TestAccountAddress, TestPublicKey)
      } catch (e) {
        expect('No error expected').toBeFalsy()
      }
    })

    it('Should successfully validate with Account Id', () => {
      try {
        service.validate(TestAccountId, TestPublicKey)
      } catch (e) {
        expect('No error expected').toBeFalsy()
      }
    })
  })
})
