/**
 * These are temporary changes for a dummy login page
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import { LOGINPAGE_CONSTANTS } from '../LoginPage.constants';
import fetchData from '../../../../../service/API';
import { setLoginInfo, getUserInfo } from './LoginPage.actions';
import { endpoints } from '../../../../../service/endpoint';

function* login(action) {
  try {
    const { baseURI, relURI, method } = endpoints.login;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        unbxd: true,
        payload: action.payload,
      },
      method
    );
    if (res.body.responseCode === 'LoginSuccess') {
      yield put(getUserInfo());
    } else {
      yield put(setLoginInfo(res.body));
    }
  } catch (err) {
    console.log('Error in API');
    console.log(err);
  }
}

function* getUserInfoSaga() {
  try {
    const { baseURI, relURI, method } = endpoints.registeredUserInfo;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
      },
      method
    );
    yield put(setLoginInfo(res.body));
  } catch (err) {
    console.log('Error in API');
    console.log(err);
  }
}

function* LoginPageSaga() {
  yield takeLatest(LOGINPAGE_CONSTANTS.LOGIN, login);
  yield takeLatest(LOGINPAGE_CONSTANTS.GET_USER_INFO, getUserInfoSaga);
}

export default LoginPageSaga;
