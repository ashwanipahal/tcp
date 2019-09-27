import { takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../../Payment.constants';
import { DeleteCardSaga, deleteCard } from '../DeleteCard.saga';
import {
  updateCardListonDeleteErr,
  setDeleteModalMountedState,
  clearCardBalance,
} from '../Payment.actions';

describe('DeleteAddressSaga', () => {
  describe('deleteAddress', () => {
    let deleteCardGen;
    const payload = {
      creditCardId: '123456',
      action: 'D',
      ccType: 'GiftCard',
      accountNo: '***************2525',
    };
    beforeEach(() => {
      deleteCardGen = deleteCard({ payload });
      deleteCardGen.next();
    });
    it('should dispatch updateCardListonDelete action for success response', () => {
      const response = {
        statusCode: 200,
        body: { addressId: '12345' },
      };
      deleteCardGen.next(response);
      deleteCardGen.next();
      expect(deleteCardGen.next().value).toEqual(put(setDeleteModalMountedState({ state: false })));
    });
    it('should dispatch updateCardListonDelete action for success response if body is not present', () => {
      const response = {
        statusCode: 200,
      };
      deleteCardGen.next(response);
      deleteCardGen.next();
      expect(deleteCardGen.next().value).toEqual(put(setDeleteModalMountedState({ state: false })));
    });
    it('should dispatch updateCardListonDeleteErr action for error response', () => {
      const response = {
        error: 'error in API',
      };
      const putDescriptor = deleteCardGen.next(response).value;
      expect(putDescriptor).toEqual(put(updateCardListonDeleteErr(response.error)));
    });
    it('should dispatch updateCardListonDeleteErr action when api fails', () => {
      const response = {
        error: 'error in API',
      };
      const putDescriptor = deleteCardGen.throw(response).value;
      expect(putDescriptor).toEqual(put(updateCardListonDeleteErr(response)));
    });
    it('should dispatch clearCardBalance action when card type is Gift', () => {
      deleteCardGen.next({ statusCode: 200 });
      deleteCardGen.next();
      deleteCardGen.next();
      const putDescriptor = deleteCardGen.next({
        payload,
      }).value;
      expect(putDescriptor).toEqual(put(clearCardBalance(payload)));
    });
  });
  describe('deleteAddressSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = DeleteCardSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(PAYMENT_CONSTANTS.DELETE_CARD, deleteCard));
    });
  });
});
