/**
 * These are temporary changes for a dummy login page
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import LOGINPAGE_CONSTANTS from '../ForgotPassword.constants';
import fetchData from '../../../../../service/API';
import resetPassword from './ForgotPassword.actions';
import endpoints from '../../../../../service/endpoint';

function* ForgotPassword(action) {
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
    if (res) {
      yield put(resetPassword());
    }
  } catch (err) {
    console.log(err);
  }
}
function* ForgotPasswordSaga() {
  yield takeLatest(LOGINPAGE_CONSTANTS.RESET_PASSWORD, ForgotPassword);
}

export default ForgotPasswordSaga;
