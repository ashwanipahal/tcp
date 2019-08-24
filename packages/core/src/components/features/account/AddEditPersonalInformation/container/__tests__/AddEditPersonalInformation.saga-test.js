import { put, takeLatest } from 'redux-saga/effects';
import { ChangePassword, ChangePasswordSaga } from '../AddEditPersonalInformation.saga';
import { changePasswordSuccess, changePasswordError } from '../AddEditPersonalInformation.actions';
import constants from '../../AddEditPersonalInformation.constants';

describe('ChangePassword saga', () => {
  describe('ChangePassword', () => {
    let gen;
    beforeEach(() => {
      gen = ChangePassword({});
      gen.next();
    });

    it('should dispatch changePasswordSuccess action for success response', () => {
      const response = 'success';
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(changePasswordSuccess(response)));
    });

    it('should dispatch changePasswordError action if response is error', () => {
      const response = 'error';
      const putDescriptor = gen.throw(response).value;
      expect(putDescriptor).toEqual(put(changePasswordError(response)));
    });
  });

  describe('ChangePasswordSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = ChangePasswordSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.CHANGE_PASSWORD, ChangePassword);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
