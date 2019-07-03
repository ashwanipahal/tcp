import { put, takeLatest } from 'redux-saga/effects';
import { DeleteAddressSaga, deleteAddress } from '../DeleteAddress.saga';
import ADDRESS_BOOK_CONSTANTS from '../../AddressBook.constants';
import {
  updateAddressListOnDelete,
  updateAddressListOnDeleteErr,
  setDeleteModalMountedState,
} from '../AddressBook.actions';

describe('DeleteModalSaga', () => {
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
      expect(deleteAddressGen.next().value).toEqual(
        put(setDeleteModalMountedState({ state: false }))
      );
    });
    it('should dispatch updateAddressListOnDelete action for success response if body is not present', () => {
      const response = {
        statusCode: 200,
      };
      const putDescriptor = deleteAddressGen.next(response).value;
      expect(putDescriptor).toEqual(put(updateAddressListOnDelete('')));
      expect(deleteAddressGen.next().value).toEqual(
        put(setDeleteModalMountedState({ state: false }))
      );
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
      const generator = DeleteAddressSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(ADDRESS_BOOK_CONSTANTS.DELETE_ADDRESS, deleteAddress)
      );
    });
  });
});
