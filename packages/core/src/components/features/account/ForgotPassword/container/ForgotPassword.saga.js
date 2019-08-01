/**
 * These are temporary changes for a dummy login page
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import FORGOTPASSWORD_CONSTANTS from '../ForgotPassword.constants';
import fetchData from '../../../../../service/API';
import {
  getResetPasswordSuccess,
  userNotAvailable,
  getResetPasswordFail,
} from './ForgotPassword.actions';
import endpoints from '../../../../../service/endpoint';

export function* ForgotPassword(action) {
  try {
    const { relURI, method } = endpoints.requestPassword;
    const baseURI = endpoints.requestPassword.baseURI || endpoints.global.baseURI;
    const body = {
      formFlag: 'true',
      isPasswordReset: 'true',
      logonId: action.payload.logonId,
      reLogonURL: 'ChangePassword',
    };
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        payload: body,
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
      },
      method
    );
    /* istanbul ignore else */
    if (res) {
      yield put(getResetPasswordSuccess({ state: true }));
    }
  } catch (err) {
    let error = {};
    /* istanbul ignore else */
    if (err instanceof Error) {
      error = err.response.body;
    }
    /* istanbul ignore else */
    if (error) {
      yield put(userNotAvailable(error));
    }
    yield put(getResetPasswordFail({ state: true }));
  }
}
export function* ForgotPasswordSaga() {
  yield takeLatest(FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD, ForgotPassword);
}

export default ForgotPasswordSaga;
