import { put, takeLatest } from 'redux-saga/effects';
import { addAddressGet, updateAddressPut, AddEditAddressSaga } from '../AddEditAddress.saga';
import { addAddressSuccess, addAddressFail } from '../AddEditAddress.actions';
import constants from '../AddEditAddress.constants';

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
      addAddressGetGeneration.next();
      const putDescriptor = addAddressGetGeneration.next().value;
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

  describe('updateAddressPut', () => {
    const payload = {
      contact: [],
    };
    let updateAddressGetGeneration;
    beforeEach(() => {
      updateAddressGetGeneration = updateAddressPut({ payload });
      updateAddressGetGeneration.next();
    });

    it('should dispatch addAddressSuccess action for success resposnse', () => {
      const response = {
        addressId: '75400543',
        nickName: 'sb_2019-07-02 02:33:01.433',
      };
      updateAddressGetGeneration.next(response);
      updateAddressGetGeneration.next();
      const putDescriptor = updateAddressGetGeneration.next().value;
      expect(putDescriptor).toEqual(put(addAddressSuccess()));
    });

    it('should dispatch addAddressFail action if response is fail', () => {
      const errorBody = {};
      const error = {
        response: {
          body: errorBody,
        },
      };
      const putDescriptor = updateAddressGetGeneration.throw(error).value;
      expect(putDescriptor).toEqual(put(addAddressFail(errorBody)));
    });
  });

  describe('AddEditAddressSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AddEditAddressSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(constants.ADD_USER_ADDRESS_REQ, addAddressGet)
      );
    });
  });
});
