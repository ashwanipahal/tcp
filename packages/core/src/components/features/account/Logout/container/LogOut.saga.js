import { call, takeLatest, put } from 'redux-saga/effects';
import LOGOUT_CONSTANTS from '../LogOut.constants';
import { resetUserInfo } from '../../User/container/User.actions';
import { closeOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';
import { routerPush, isMobileApp, scrollPage } from '../../../../../utils';
import { LogoutApplication } from '../../../../../services/abstractors/account';

export function* logoutSaga() {
  try {
    const res = yield call(LogoutApplication);
    if (res.statusCode === 200) {
      yield put(resetUserInfo());
      if (!isMobileApp()) {
        yield put(closeOverlayModal());
        if (window.location.href.indexOf('account') > 0) {
          routerPush('/', '/home');
          scrollPage();
        } else {
          scrollPage();
        }
      }
    }
  } catch (err) {
    if (!isMobileApp()) {
      routerPush('/', '/home');
    }
  }
}

export function* LogOutPageSaga() {
  yield takeLatest(LOGOUT_CONSTANTS.LOGOUT_APP, logoutSaga);
}

export default LogOutPageSaga;
