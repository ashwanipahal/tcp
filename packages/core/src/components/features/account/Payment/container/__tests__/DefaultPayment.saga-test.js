import { put, takeLatest } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../../utils/cache.util';
import { setDefaultPayment, DefaultPaymentSaga } from '../DefaultPayment.saga';
import { getCardList, setDefaultPaymentSuccess, setDefaultPaymentError } from '../Payment.actions';
import PAYMENT_CONSTANTS from '../../Payment.constants';
import { clearGetAddressListTTl } from '../../../AddressBook/container/AddressBook.actions';

describe('DefaultPayment saga', () => {
  describe('setDefaultPayment', () => {
    let defaultPaymentGen;
    const payload = {
      blahBlah: 'blah blah',
      fooFoo: 'foo foo',
      nickName: 'foo',
    };
    beforeEach(() => {
      defaultPaymentGen = setDefaultPayment({ payload });
      defaultPaymentGen.next();
    });

    it('should dispatch getCardList action for success response', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      const putDescriptor = defaultPaymentGen.next(response).value;
      expect(putDescriptor).toEqual(put(getCardList({ ignoreCache: true })));
    });
    it('should dispatch clearGetAddressListTTl action for success response', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      let putDescriptor = defaultPaymentGen.next(response).value;
      putDescriptor = defaultPaymentGen.next(response).value;
      expect(putDescriptor).toEqual(put(clearGetAddressListTTl()));
    });
    it('should dispatch setDefaultPaymentSuccess action for success response', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      let putDescriptor = defaultPaymentGen.next(response).value;
      putDescriptor = defaultPaymentGen.next(response).value;
      putDescriptor = defaultPaymentGen.next(response).value;
      expect(putDescriptor).toEqual(put(setDefaultPaymentSuccess()));
    });

    it('should not dispatch setDefaultPaymentError action if response is error', () => {
      const response = {
        error: 'Error in API',
      };
      const putDescriptor = defaultPaymentGen.next(response).value;
      expect(putDescriptor).toEqual(put(setDefaultPaymentError()));
    });

    it('should not dispatch setDefaultPaymentError action for error', () => {
      const response = {
        error: 'Error in API',
      };
      const putDescriptor = defaultPaymentGen.throw(response).value;
      expect(putDescriptor).toEqual(put(setDefaultPaymentError(response)));
    });
  });

  describe('CardListSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = DefaultPaymentSaga();
      const takeLatestDescriptor = generator.next().value;
      const cachedMethod = validateReduxCache(setDefaultPayment);
      const expected = takeLatest(PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
