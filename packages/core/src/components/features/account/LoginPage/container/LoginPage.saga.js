/**
 * These are temporary changes for a dummy login page
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';
import fetchData from '../../../../../service/API';
import { setLoginInfo } from './LoginPage.actions';
import endpoints from '../../../../../service/endpoint';

const errorLabel = 'Error in API';

function* login(action) {
  try {
    const { relURI, method } = endpoints.login;
    const baseURI = endpoints.login.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        payload: action.payload,
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
      },
      method
    );
    // if (res.body.responseCode === 'LoginSuccess') {
    //   yield put(getUserInfo());
    // } else {
    //   yield put(setLoginInfo(res.body));
    // }
    console.log('respone', res);
  } catch (err) {
    console.log(errorLabel);
    console.log(err);
  }
}

function* getUserInfoSaga() {
  try {
    const { relURI, method } = endpoints.registeredUserInfo;
    const baseURI = endpoints.registeredUserInfo.baseURI || endpoints.global.baseURI;
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
    console.log(errorLabel);
    console.log(err);
  }
}

function* getOrderDetailSaga() {
  try {
    const { relURI, method } = endpoints.getOrderDetails;
    const baseURI = endpoints.getOrderDetails.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        pageName: 'fullOrderInfo',
      },
      method
    );
    yield put(setLoginInfo(res.body));
  } catch (err) {
    console.log(errorLabel);
    console.log(err);
  }
}

function* LoginPageSaga() {
  yield takeLatest(LOGINPAGE_CONSTANTS.LOGIN, login);
  yield takeLatest(LOGINPAGE_CONSTANTS.GET_USER_INFO, getUserInfoSaga);
  yield takeLatest('GET_ORDER_DETAIL', getOrderDetailSaga);
}

export default LoginPageSaga;
