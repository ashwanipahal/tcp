import { put, takeLatest } from 'redux-saga/effects';
import { DeleteAddressSaga, deleteAddress } from '../DeleteAddress.saga';
import ADDRESS_BOOK_CONSTANTS from '../../AddressBook.constants';
import {
  updateAddressListOnDelete,
  updateAddressListOnDeleteErr,
  setDeleteModalMountedState,
} from '../AddressBook.actions';

describe('DeleteAddressSaga', () => {
  describe('deleteAddress', () => {
    let deleteAddressGen;
    const payload = {
      nickName: 'nickname',
    };
    beforeEach(() => {
      deleteAddressGen = deleteAddress({ payload });
      deleteAddressGen.next();
      deleteAddressGen.next();
    });
    it('should dispatch updateAddressListOnDelete action for success response', () => {
      const response = {
        statusCode: 200,
        body: { addressId: '12345' },
      };
      deleteAddressGen.next(response);
      const putDescriptor = deleteAddressGen.next().value;
      expect(putDescriptor).toEqual(put(updateAddressListOnDelete(response.body)));
      deleteAddressGen.next();
      deleteAddressGen.next();
      expect(deleteAddressGen.next().value).toEqual(
        put(setDeleteModalMountedState({ state: false }))
      );
    });
    it('should dispatch updateAddressListOnDelete action for success response if body is not present', () => {
      const response = {
        statusCode: 200,
      };
      deleteAddressGen.next(response);
      const putDescriptor = deleteAddressGen.next().value;
      expect(putDescriptor).toEqual(put(updateAddressListOnDelete('')));
      deleteAddressGen.next();
      deleteAddressGen.next();
      expect(deleteAddressGen.next().value).toEqual(
        put(setDeleteModalMountedState({ state: false }))
      );
    });
    it('should dispatch updateAddressListOnDeleteErr action for error response', () => {
      const response = {
        error: 'error in API',
      };
      deleteAddressGen.next(response);
      const putDescriptor = deleteAddressGen.next().value;
      expect(putDescriptor).toEqual(put(updateAddressListOnDeleteErr(response.error)));
    });
    it('should dispatch updateAddressListOnDeleteErr action when api fails', () => {
      const response = {
        error: 'error in API',
      };
      deleteAddressGen.throw(response);
      const putDescriptor = deleteAddressGen.next().value;
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
