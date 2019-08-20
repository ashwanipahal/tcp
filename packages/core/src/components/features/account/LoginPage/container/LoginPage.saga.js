import { call, takeLatest, put } from 'redux-saga/effects';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';
import { setLoginInfo } from './LoginPage.actions';
import { getUserInfo } from '../../User/container/User.actions';
import fetchData from '../../../../../service/API';
import { login } from '../../../../../services/abstractors/account';
import endpoints from '../../../../../service/endpoint';

const errorLabel = 'Error in API';

const notIsLocalHost = siteOrigin => {
  return siteOrigin.indexOf('local') === -1;
};

export function* loginSaga({ payload }) {
  try {
    const response = yield call(login, payload);
    if (response.success) {
      return yield put(getUserInfo());
    }
    return yield put(setLoginInfo(response));
  } catch (err) {
    return yield put(
      setLoginInfo({
        success: false,
        errorCode: err.errorCode,
        errorMessage: err.errorMessage,
      })
    );
  }
}

function* getUserInfoPOCSaga() {
  try {
    const { relURI, method } = endpoints.registeredUserInfoPOC;
    const siteOrigin = window && window.location && window.location.origin;
    const baseURI = notIsLocalHost(siteOrigin)
      ? siteOrigin
      : endpoints.registeredUserInfoPOC.baseURI || endpoints.global.baseURI;

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
    const siteOrigin = window && window.location && window.location.origin;
    const baseURI = notIsLocalHost(siteOrigin)
      ? siteOrigin
      : endpoints.getOrderDetails.baseURI || endpoints.global.baseURI;

    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        pageName: 'fullOrderInfo',
        poc: 'withCredentials',
      },
      method
    );
    yield put(setLoginInfo(res.body));
  } catch (err) {
    console.log(errorLabel);
    console.log(err);
  }
}

export function* LoginPageSaga() {
  yield takeLatest(LOGINPAGE_CONSTANTS.LOGIN, loginSaga);
  yield takeLatest('GET_ORDER_DETAIL', getOrderDetailSaga);
  yield takeLatest('GET_USER_DETAIL_POC', getUserInfoPOCSaga);
}

export default LoginPageSaga;
