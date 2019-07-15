import { takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../../Payment.constants';
import { DeleteCardSaga, deleteCard } from '../DeleteCard.saga';
import {
  updateCardListonDelete,
  updateCardListonDeleteErr,
  setDeleteModalMountedState,
} from '../Payment.actions';

describe('DeleteAddressSaga', () => {
  describe('deleteAddress', () => {
    let deleteCardGen;
    const payload = {
      creditCardId: '123456',
      action: 'D',
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
      const putDescriptor = deleteCardGen.next(response).value;
      expect(putDescriptor).toEqual(put(updateCardListonDelete(response.body)));
      expect(deleteCardGen.next().value).toEqual(put(setDeleteModalMountedState({ state: false })));
    });
    it('should dispatch updateCardListonDelete action for success response if body is not present', () => {
      const response = {
        statusCode: 200,
      };
      const putDescriptor = deleteCardGen.next(response).value;
      expect(putDescriptor).toEqual(put(updateCardListonDelete('')));
      expect(deleteCardGen.next().value).toEqual(put(setDeleteModalMountedState({ state: false })));
    });
    it('should dispatch updateCardListonDelete action for error response', () => {
      const response = {
        error: 'error in API',
      };
      const putDescriptor = deleteCardGen.next(response).value;
      expect(putDescriptor).toEqual(put(updateCardListonDeleteErr(response.error)));
    });
    it('should dispatch updateCardListonDelete action when api fails', () => {
      const response = {
        error: 'error in API',
      };
      const putDescriptor = deleteCardGen.throw(response).value;
      expect(putDescriptor).toEqual(put(updateCardListonDeleteErr(response)));
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
