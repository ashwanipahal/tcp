import { put, takeLatest } from 'redux-saga/effects';
import { addAddressGet, AddAddressSaga } from '../AddAddress/AddAddress.saga';
import { addAddressSuccess, addAddressFail } from '../AddAddress/AddAddress.actions';
import ADD_ADDRESS_CONSTANTS from '../AddAddress/AddAddress.constants';

describe('addAddressGet saga', () => {
  describe('addAddressGet', () => {
    const payload = {
      contact: [],
    };
    let addAddressGetGeneration;
    beforeEach(() => {
      addAddressGetGeneration = addAddressGet({ payload });
      addAddressGetGeneration.next();
    });

    it('should dispatch addAddressSuccess action for success resposnse', () => {
      const response = {
        addressId: '75400543',
        nickName: 'sb_2019-07-02 02:33:01.433',
      };
      addAddressGetGeneration.next(response);
      let putDescriptor = addAddressGetGeneration.next().value;
      putDescriptor = addAddressGetGeneration.next().value;
      expect(putDescriptor).toEqual(put(addAddressSuccess()));
    });

    it('should dispatch addAddressFail action if response is fail', () => {
      const errorBody = {};
      const error = {
        response: {
          body: errorBody,
        },
      };
      const putDescriptor = addAddressGetGeneration.throw(error).value;
      expect(putDescriptor).toEqual(put(addAddressFail(errorBody)));
    });
  });

  describe('AddAddressSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AddAddressSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_REQ, addAddressGet)
      );
    });
  });
});
