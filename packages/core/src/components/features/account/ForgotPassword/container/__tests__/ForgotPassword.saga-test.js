import { put, takeLatest } from 'redux-saga/effects';
import { ForgotPassword, ForgotPasswordSaga } from '../ForgotPassword.saga';
import { getResetPasswordSuccess, userNotAvailable } from '../ForgotPassword.actions';
import FORGOTPASSWORD_CONSTANTS from '../../ForgotPassword.constants';

describe('ForgotPassword saga', () => {
  describe('ForgotPassword', () => {
    const payload = {
      catalogId: '10551',
      formFlag: 'true',
      isPasswordReset: 'true',
      langId: '-1',
      logonId: 'SRAWAL@SAPIENT.COM',
      reLogonURL: 'ChangePassword',
      storeId: '10151',
    };
    let ForgotPasswordGeneration;
    beforeEach(() => {
      ForgotPasswordGeneration = ForgotPassword({ payload });
      ForgotPasswordGeneration.next();
    });

    it('should dispatch getResetPasswordSuccess action for success resposnse', () => {
      const response = {
        statusCode: 200,
        userId: '12345',
      };
      const putDescriptor = ForgotPasswordGeneration.next(response.userId).value;
      expect(putDescriptor).toEqual(put(getResetPasswordSuccess({ state: true })));
    });

    it('should dispatch addAddressFail action if response is fail', () => {
      const errorBody = {};
      const error = {
        response: {
          body: errorBody,
        },
      };
      const putDescriptor = ForgotPasswordGeneration.throw(error).value;
      expect(putDescriptor).toEqual(put(userNotAvailable(errorBody)));
    });

    it('should dispatch updateCardListonDelete action for success response if body is not present', () => {
      const response = {
        statusCode: 200,
      };
      const putDescriptor = ForgotPasswordGeneration.next(response).value;
      expect(putDescriptor).toEqual(put(getResetPasswordSuccess({ state: true })));
    });
  });

  describe('ForgotPasswordSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = ForgotPasswordSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD, ForgotPassword)
      );
    });
  });
});
