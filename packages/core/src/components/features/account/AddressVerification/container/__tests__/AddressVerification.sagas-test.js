import { put, takeLatest } from 'redux-saga/effects';
import { verifyAddress, verifyAddressSaga, getResultType } from '../AddressVerification.sagas';
import { verifyAddressError, verifyAddressSuccess } from '../AddressVerification.actions';
import CONSTANTS from '../../AddressVerification.constants';

describe('AddressVerification saga', () => {
  describe('verifyAddress', () => {
    let verifyAddressGen;
    beforeEach(() => {
      verifyAddressGen = verifyAddress({ payload: { firstName: 'test' } });
      verifyAddressGen.next();
    });

    it('should dispatch verifyAddressSuccess action for success resposnse', () => {
      const response = {
        body: {
          Records: [
            {
              AddressLine1: 'test address',
              Results: 'AS01',
            },
          ],
        },
      };
      const putDescriptor = verifyAddressGen.next(response).value;
      expect(putDescriptor).toEqual(
        put(
          verifyAddressSuccess(
            { firstName: 'test', address1: 'test address', isCommercialAddress: false },
            'AS01'
          )
        )
      );
    });

    it('should dispatch verifyAddressError action for error resposnse', () => {
      const response = {
        body: null,
      };
      const putDescriptor = verifyAddressGen.next(response).value;
      expect(putDescriptor).toEqual(put(verifyAddressError('ERROR')));
    });
  });

  describe('#getResultType', () => {
    it('should return AS01 for valid address', () => {
      const resultType = getResultType({
        Records: [
          {
            Results: 'AS01',
          },
        ],
      });

      expect(resultType).toEqual('AS01');
    });

    it('should return AE09 if its at the first position', () => {
      const resultType = getResultType({
        Records: [
          {
            Results: 'AE09,AE11,AE12',
          },
        ],
      });

      expect(resultType).toEqual('AE09');
    });

    it('should return AE10 if its the only resultType', () => {
      const resultType = getResultType({
        Records: [
          {
            Results: 'AE10',
          },
        ],
      });

      expect(resultType).toEqual('AE10');
    });

    it('should return AE11 if its presnt in the result type', () => {
      const resultType = getResultType({
        Records: [
          {
            Results: 'AE11',
          },
        ],
      });

      expect(resultType).toEqual('AE11');
    });

    it('should return AE12 if its presnt in the result type', () => {
      const resultType = getResultType({
        Records: [
          {
            Results: 'AE12',
          },
        ],
      });

      expect(resultType).toEqual('AE12');
    });

    it('should return default for all other cases', () => {
      const resultType = getResultType({
        Records: [
          {
            Results: '',
          },
        ],
      });

      expect(resultType).toEqual('DEFAULT');
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
