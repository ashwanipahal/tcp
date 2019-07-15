import { takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../../Payment.constants';
import { getGiftCardBalance, GiftCardBalanceSaga } from '../GetCardBalance.saga';
import { setcheckBalance, setcheckBalanceError } from '../Payment.actions';

describe('GiftCardBalanceSaga', () => {
  describe('getGiftCardBalance', () => {
    let getcardBalanceCardGen;
    const payload = {
      formData: {
        recaptchaToken: 'fdfdfk23424',
      },
      card: {
        creditCardId: '12345',
      },
    };
    beforeEach(() => {
      getcardBalanceCardGen = getGiftCardBalance({ payload });
      getcardBalanceCardGen.next();
    });
    it('should dispatch getGiftCardBalance action for success response', () => {
      const response = {
        statusCode: 200,
        body: {
          giftCardAuthorizedAmt: 100.0,
          giftCardNbr: '***************2517',
          giftCardPin: '****',
        },
      };
      const putDescriptor = getcardBalanceCardGen.next(response).value;
      expect(putDescriptor).toEqual(put(setcheckBalance(response.body)));
    });
    it('should dispatch setcheckBalanceError action for error response', () => {
      const errorBody = {};
      const error = {
        response: {
          body: errorBody,
        },
      };
      const putDescriptor = getcardBalanceCardGen.next(error).value;
      expect(putDescriptor).toEqual(put(setcheckBalanceError()));
    });
    it('should dispatch setcheckBalanceError action when api fails', () => {
      const response = {
        error: 'error in API',
      };
      const putDescriptor = getcardBalanceCardGen.throw(response).value;
      expect(putDescriptor).toEqual(put(setcheckBalanceError(response)));
    });
  });
  describe('GiftCardBalanceSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = GiftCardBalanceSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(PAYMENT_CONSTANTS.CHECK_BALANCE, getGiftCardBalance)
      );
    });
  });
});
