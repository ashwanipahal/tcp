import { call, takeLatest, put } from 'redux-saga/effects';
import LOGOUT_CONSTANTS from '../LogOut.constants';
import { resetLoginInfo } from '../../LoginPage/container/LoginPage.actions';
import { routerPush } from '../../../../../utils/utils';
import { LogoutApplication } from '../../../../../services/abstractors/account';

export function* logoutSaga() {
  try {
    const res = yield call(LogoutApplication);
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
