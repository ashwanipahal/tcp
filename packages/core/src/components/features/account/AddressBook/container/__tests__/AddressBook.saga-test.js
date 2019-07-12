import { put, takeLatest } from 'redux-saga/effects';
import { getAddressList, AddressBookSaga } from '../AddressBook.saga';
import { validateReduxCache } from '../../../../../../utils/cache.util';
import { setAddressList } from '../AddressBook.actions';
import ADDRESS_BOOK_CONSTANTS from '../../AddressBook.constants';

describe('AddressList saga', () => {
  describe('getAddressList', () => {
    let addressListGen;
    beforeEach(() => {
      addressListGen = getAddressList();
      addressListGen.next();
      addressListGen.next();
    });
    // TODO - Rewrite Test cases to include Integration testing of Saga and Abstractor
    it('should dispatch setAddressList action for success resposnse', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      const {
        body: { contact },
      } = response;
      const putDescriptor = addressListGen.next(contact).value;
      expect(putDescriptor).toEqual(put(setAddressList(response.body.contact)));
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
      const cachedMethod = validateReduxCache(getAddressList);
      const expected = takeLatest(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
