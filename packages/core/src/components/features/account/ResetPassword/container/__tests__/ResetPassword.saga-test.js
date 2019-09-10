import { put, takeLatest } from 'redux-saga/effects';
import { ResetPassword, ResetPasswordSaga } from '../ResetPassword.saga';
import { resetPasswordSuccess, resetPasswordError } from '../ResetPassword.actions';
import constants from '../../ResetPassword.constants';

describe('ResetPassword saga', () => {
  describe('ResetPassword', () => {
    let gen;
    beforeEach(() => {
      gen = ResetPassword({});
      gen.next();
    });

    it('should dispatch resetPasswordSuccess action for success response', () => {
      const response = 'success';
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(resetPasswordSuccess(response)));
    });

    it('should dispatch resetPasswordError action if response is error', () => {
      const putDescriptor = gen.throw({ response: { body: { errors: ['test'] } } }).value;
      expect(putDescriptor).toEqual(put(resetPasswordError('test')));
    });
  });

  describe('ResetPasswordSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = ResetPasswordSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.RESET_PASSWORD, ResetPassword);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
