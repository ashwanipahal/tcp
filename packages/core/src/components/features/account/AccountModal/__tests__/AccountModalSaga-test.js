import { put, takeLatest } from 'redux-saga/effects';
import { AccountModalSaga, deleteAddress } from '../container/AccountModal.saga';
import ACCOUNT_MODAL_CONSTANTS from '../AccountModal.constants';
import {
  updateAddressListOnDelete,
  updateAddressListOnDeleteErr,
} from '../../AddressBook/container/AddressBook.actions';
import { closeModal } from '../container/AccountModal.actions';

describe('AccountModalSaga', () => {
  describe('deleteAddress', () => {
    let deleteAddressGen;
    const payload = {
      nickName: 'nickname',
    };
    beforeEach(() => {
      deleteAddressGen = deleteAddress({ payload });
      deleteAddressGen.next();
    });
    it('should dispatch updateAddressListOnDelete action for success response', () => {
      const response = {
        statusCode: 200,
        body: { addressId: '12345' },
      };
      const putDescriptor = deleteAddressGen.next(response).value;
      expect(putDescriptor).toEqual(put(updateAddressListOnDelete(response.body)));
      expect(deleteAddressGen.next().value).toEqual(put(closeModal()));
    });
    it('should dispatch updateAddressListOnDelete action for success response if body is not present', () => {
      const response = {
        statusCode: 200,
      };
      const putDescriptor = deleteAddressGen.next(response).value;
      expect(putDescriptor).toEqual(put(updateAddressListOnDelete('')));
      expect(deleteAddressGen.next().value).toEqual(put(closeModal()));
    });
    it('should dispatch updateAddressListOnDeleteErr action for error response', () => {
      const response = {
        error: 'error in API',
      };
      const putDescriptor = deleteAddressGen.next(response).value;
      expect(putDescriptor).toEqual(put(updateAddressListOnDeleteErr(response.error)));
    });
    it('should dispatch updateAddressListOnDeleteErr action when api fails', () => {
      const response = {
        error: 'error in API',
      };
      const putDescriptor = deleteAddressGen.throw(response).value;
      expect(putDescriptor).toEqual(put(updateAddressListOnDeleteErr(response)));
    });
  });
  describe('deleteAddressSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AccountModalSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(ACCOUNT_MODAL_CONSTANTS.DELETE_ADDRESS, deleteAddress)
      );
    });
  });
});
