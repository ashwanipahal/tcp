import { put, takeLatest } from 'redux-saga/effects';
import { ChangePassword, ChangePasswordSaga } from '../ChangePassword.saga';
import { changePasswordError } from '../ChangePassword.actions';
import { updateProfileSuccess } from '../../../MyProfile/container/MyProfile.actions';
import constants from '../../ChangePassword.constants';

describe('ChangePassword saga', () => {
  describe('ChangePassword', () => {
    let gen;
    beforeEach(() => {
      gen = ChangePassword({});
      gen.next();
    });

    it('should dispatch updateProfileSuccess action for success response', () => {
      const response = 'success';
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(updateProfileSuccess(response)));
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
