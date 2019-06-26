import { put, takeLatest } from 'redux-saga/effects';
import { getAddressList, AddressBookSaga } from '../AddressBook.saga';
import { setAddressList } from '../AddressBook.actions';
import ADDRESS_BOOK_CONSTANTS from '../../AddressBook.constants';

describe('AddressList saga', () => {
  describe('getAddressList', () => {
    let addressListGen;
    beforeEach(() => {
      addressListGen = getAddressList();
      addressListGen.next();
    });

    it('should dispatch setAddressList action for success resposnse', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      const putDescriptor = addressListGen.next(response).value;
      expect(putDescriptor).toEqual(put(setAddressList(response.body.contact)));
    });

    it('should not dispatch setAddressList action if response is null', () => {
      const response = {
        body: null,
      };
      const putDescriptor = addressListGen.next(response).value;
      expect(putDescriptor).toBeNull();
    });

    it('should not dispatch setAddressList action for error', () => {
      const error = new Error();
      const putDescriptor = addressListGen.throw(error).value;
      expect(putDescriptor).toBeNull();
    });
  });

  describe('AddressListSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AddressBookSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST, getAddressList)
      );
    });
  });
});
