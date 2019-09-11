/**
 * These are temporary changes for a dummy login page
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import FORGOTPASSWORD_CONSTANTS from '../ForgotPassword.constants';
import {
  getResetPasswordSuccess,
  userNotAvailable,
  getResetPasswordFail,
} from './ForgotPassword.actions';
import { forgotPassword } from '../../../../../services/abstractors/account';

export function* ForgotPassword(action) {
  try {
    const body = {
      formFlag: 'true',
      isPasswordReset: 'true',
      logonId: action.payload.logonId,
      reLogonURL: 'ChangePassword',
    };
    const res = yield call(forgotPassword, body);
    /* istanbul ignore else */
    if (res) {
      yield put(getResetPasswordSuccess({ state: true }));
    }
  } catch (err) {
    let error = {};
    /* istanbul ignore else */
    error = err;
    if (error && error.response) {
      return yield put(userNotAvailable(error.response.body.errors[0]));
    }
    yield put(getResetPasswordFail({ state: true }));
  }
}
export function* ForgotPasswordSaga() {
  yield takeLatest(FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD, ForgotPassword);
}

export default ForgotPasswordSaga;
