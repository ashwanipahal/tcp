import { put, takeLatest } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../../utils/cache.util';
import { setDefaultPayment, DefaultPaymentSaga } from '../DefaultPayment.saga';
import { getCardList, setDefaultPaymentSuccess, setDefaultPaymentError } from '../Payment.actions';
import PAYMENT_CONSTANTS from '../../Payment.constants';
import { clearGetAddressListTTL } from '../../../AddressBook/container/AddressBook.actions';

describe('DefaultPayment saga', () => {
  describe('setDefaultPayment', () => {
    let defaultPaymentGen;
    const payload = {
      accountNo: '************6765',
      billingAddressId: 75446663,
      addressDetails: {
        addressLine1: 'Yucca Street',
        addressLine2: '',
        city: 'Los Angeles',
        country: 'US',
        firstName: 'six',
        lastName: 'test',
        phone1: '3214567890',
        state: 'CA',
        zipCode: '90028',
      },
      ccBrand: 'DISC',
      ccType: 'COMPASSDISCOVER',
      creditCardId: 8977328,
      defaultInd: false,
      expMonth: '10',
      expYear: '2025',
      nameOnAccount: '.',
      properties: null,
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
    it('should dispatch clearGetAddressListTTL action for success response', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      let putDescriptor = defaultPaymentGen.next(response).value;
      putDescriptor = defaultPaymentGen.next(response).value;
      expect(putDescriptor).toEqual(put(clearGetAddressListTTL()));
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
