import { put, takeLatest } from 'redux-saga/effects';
import { updateAddressPut, UpdateAddressSaga } from '../AddAddress/UpdateAddress.saga';
import { addAddressSuccess, addAddressFail } from '../AddAddress/AddAddress.actions';
import ADD_ADDRESS_CONSTANTS from '../AddAddress/AddAddress.constants';

describe('updateAddressPut saga', () => {
  describe('updateAddressPut', () => {
    const payload = {};
    let updateAddressPuttGeneration;
    beforeEach(() => {
      updateAddressPuttGeneration = updateAddressPut({ payload });
      updateAddressPuttGeneration.next();
    });

    it('should dispatch addAddressSuccess action for success resposnse', () => {
      const response = {
        addressId: '75400543',
        nickName: 'sb_2019-07-02 02:33:01.433',
      };
      const putDescriptor = updateAddressPuttGeneration.next(response).value;
      expect(putDescriptor).toEqual(put(addAddressSuccess()));
    });

    it('should dispatch addAddressFail action if response is fail', () => {
      const error = new Error();
      const putDescriptor = updateAddressPuttGeneration.throw(error).value;
      expect(putDescriptor).toEqual(put(addAddressFail()));
    });
  });

  describe('UpdateAddressSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = UpdateAddressSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(ADD_ADDRESS_CONSTANTS.UPDATE_USER_ADDRESS_REQ, updateAddressPut)
      );
    });
  });
});
