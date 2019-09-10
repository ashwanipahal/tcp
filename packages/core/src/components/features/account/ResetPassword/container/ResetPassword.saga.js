import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../ResetPassword.constants';
import { resetPasswordError, resetPasswordSuccess } from './ResetPassword.actions';

import { resetPassword } from '../../../../../services/abstractors/account';

export function* ResetPassword({ payload }) {
  try {
    const res = yield call(resetPassword, payload);
    return yield put(resetPasswordSuccess(res));
  } catch (err) {
    let error = {};
    /* istanbul ignore else */
    error = err;
    if (error && error.response) {
      return yield put(resetPasswordError(error.response.body.errors[0]));
    }
    return null;
  }
}

export function* ResetPasswordSaga() {
  yield takeLatest(constants.RESET_PASSWORD, ResetPassword);
}

export default ResetPasswordSaga;
