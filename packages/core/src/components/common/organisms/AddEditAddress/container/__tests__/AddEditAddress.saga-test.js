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
      addAddressGetGeneration.next();
      addAddressGetGeneration.next();
    });

    it('should dispatch addAddressSuccess action for success resposnse', () => {
      const response = {
        addressId: '75400543',
        nickName: 'sb_2019-07-02 02:33:01.433',
      };
      addAddressGetGeneration.next(response);
      addAddressGetGeneration.next();
      addAddressGetGeneration.next();
      addAddressGetGeneration.next();
      const putDescriptor1 = addAddressGetGeneration.next().value;
      expect(putDescriptor1).toEqual(put(addAddressSuccess()));
    });

    it('should dispatch addAddressFail action if response is fail two', () => {
      addAddressGetGeneration.throw({
        response: { body: { errors: ['test'] } },
      });
      const putDescriptor = addAddressGetGeneration.next().value;
      expect(putDescriptor).toEqual(put(addAddressFail('test')));
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
      updateAddressGetGeneration.next();
      updateAddressGetGeneration.next();
    });

    it('should dispatch addAddressSuccess action for success resposnse', () => {
      const response = {
        addressId: '75400543',
        nickName: 'sb_2019-07-02 02:33:01.433',
      };
      updateAddressGetGeneration.next(response);
      updateAddressGetGeneration.next();
      updateAddressGetGeneration.next();
      updateAddressGetGeneration.next();
      const putDescriptor = updateAddressGetGeneration.next().value;
      expect(putDescriptor).toEqual(put(addAddressSuccess()));
    });

    it('should dispatch addAddressFail action if response is fail', () => {
      updateAddressGetGeneration.next();
      const errorBody = {};
      const error = {
        body: {
          errors: errorBody,
        },
      };
      updateAddressGetGeneration.throw(error);
      const putDescriptor = updateAddressGetGeneration.next().value;
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
