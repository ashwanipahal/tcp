import { call, takeLatest, put } from 'redux-saga/effects';
import LOGOUT_CONSTANTS from '../LogOut.constants';
import { logout } from './LOGOUT.actions';
import fetchData from '../../../../../service/API';
// import { login, getProfile } from '../../../../../services/abstractors/account';
import endpoints from '../../../../../service/endpoint';

const errorLabel = 'Error in API';

const notIsLocalHost = siteOrigin => {
  return siteOrigin.indexOf('local') === -1;
};

function* logoutSaga() {
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
    yield put(logout(res.body));
  } catch (err) {
    console.log(errorLabel);
    console.log(err);
  }
}

export function* LogOutPageSaga() {
  yield takeLatest(LOGOUT_CONSTANTS.LOGOUT_APP, logoutSaga);
}

export default LogOutPageSaga;
