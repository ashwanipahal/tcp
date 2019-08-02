import { call, takeLatest, put } from 'redux-saga/effects';
import LOGOUT_CONSTANTS from '../LogOut.constants';
import { resetLoginInfo } from '../../LoginPage/container/LoginPage.actions';
import { routerPush } from '../../../../../utils/utils';
import fetchData from '../../../../../service/API';
// import { login, getProfile } from '../../../../../services/abstractors/account';
// import endpoints from '../../../../../service/endpoint';
import endpoints from '../../../../../service/endpoint';

export function* logoutSaga() {
  try {
    const { relURI, method } = endpoints.logout;
    const baseURI = endpoints.logout.baseURI || endpoints.global.baseURI;

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
    if (res.statusCode === 200) {
      yield put(resetLoginInfo());
      routerPush('/', '/home');
    }
  } catch (err) {
    routerPush('/', '/home');
  }
}

export function* LogOutPageSaga() {
  yield takeLatest(LOGOUT_CONSTANTS.LOGOUT_APP, logoutSaga);
}

export default LogOutPageSaga;
