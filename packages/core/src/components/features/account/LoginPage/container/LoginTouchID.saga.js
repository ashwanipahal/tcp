import { call, takeLatest, put } from 'redux-saga/effects';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';
import { setLoginInfo, getUserInfo } from './LoginPage.actions';
import { login } from '../../../../../services/abstractors/account';
import keychainInfo from '../keychainContainer';

export function* loginTouchSaga() {
  try {
    const credentials = yield keychainInfo.getUserUserPassword();
    const getTouchinfo = yield call(keychainInfo.isSupportedTouch());

    if (credentials && getTouchinfo) {
      yield call(keychainInfo.touchIDCheck(), `Fingerprint Authentication`);
      const response = yield call(login, credentials);
      if (response.success) {
        yield put(getUserInfo());
      }
      yield put(setLoginInfo(response));
    }
  } catch (err) {
    yield put(
      setLoginInfo({
        success: false,
      })
    );
  }
}

export function* TouchSaga() {
  yield takeLatest(LOGINPAGE_CONSTANTS.LOGIN_TOUCHID, loginTouchSaga);
}

export default TouchSaga;
