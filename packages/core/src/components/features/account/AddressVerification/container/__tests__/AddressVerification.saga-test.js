import { put, takeLatest } from 'redux-saga/effects';
import { verifyAddress, verifyAddressSaga } from '../AddressVerification.saga';
import { verifyAddressError, verifyAddressSuccess } from '../AddressVerification.actions';
import CONSTANTS from '../../AddressVerification.constants';

describe('AddressVerification saga', () => {
  describe('verifyAddress', () => {
    let verifyAddressGen;
    beforeEach(() => {
      verifyAddressGen = verifyAddress({ payload: { firstName: 'test' } });
      verifyAddressGen.next();
    });

    it('should dispatch verifyAddressSuccess action for success resposnse ', () => {
      const response = {
        suggestedAddress: {
          firstName: 'test',
          address1: 'test address',
          isCommercialAddress: false,
        },
        resultType: 'AS01',
      };

      const putDescriptor = verifyAddressGen.next(response).value;
      expect(putDescriptor).toEqual(
        put(
          verifyAddressSuccess({
            suggestedAddress: {
              firstName: 'test',
              address1: 'test address',
              isCommercialAddress: false,
            },
            resultType: 'AS01',
          })
        )
      );
    });

    it('should dispatch verifyAddressError action for error resposnse', () => {
      const error = new Error();
      const putDescriptor = verifyAddressGen.throw(error).value;
      expect(putDescriptor).toEqual(put(verifyAddressError({ resultType: 'ERROR' })));
    });
  });

  describe('verifyAddressSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = verifyAddressSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(CONSTANTS.VERIFY_ADDRESS, verifyAddress));
    });
  });
});
