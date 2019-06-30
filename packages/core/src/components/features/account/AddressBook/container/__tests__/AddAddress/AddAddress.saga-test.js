import { put, takeLatest } from 'redux-saga/effects';
import { addAddressGet, AddAddressSaga } from '../../AddAddress/AddAddress.saga';
import { addAddressSuccess, addAddressFail } from '../../AddAddress/AddAddress.actions';
import ADDRESS_BOOK_CONSTANTS from '../../AddAddress/AddAddress.constants';

describe('addAddressGet saga', () => {
  describe('addAddressGet', () => {
    let addAddressGetGeneration;
    beforeEach(() => {
      addAddressGetGeneration = addAddressGet();
      addAddressGetGeneration.next();
    });

    it('should dispatch addAddressSuccess action for success resposnse', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      const putDescriptor = addAddressGetGeneration.next(response).value;
      expect(putDescriptor).toEqual(put(addAddressSuccess(response.body.contact)));
    });

    it('should not dispatch addAddressFail action if response is fail', () => {
      const error = new Error();
      const putDescriptor = addAddressGetGeneration.throw(error).value;
      expect(putDescriptor).toBeNull();
    });
  });

  describe('AddAddressSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AddAddressSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST, addAddressGet)
      );
    });
  });
});
