import { call, takeLatest, put } from 'redux-saga/effects';
import LOGOUT_CONSTANTS from '../LogOut.constants';
import { resetLoginInfo } from '../../LoginPage/container/LoginPage.actions';
import { closeOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';
import utils from '../../../../../utils';
import { LogoutApplication } from '../../../../../services/abstractors/account';

export function* logoutSaga() {
  try {
    const res = yield call(LogoutApplication);
    const matchPath = window.location.pathname.split('/')[2];
    if (res.statusCode === 200) {
      yield put(resetLoginInfo());
      if (!utils.isMobileApp()) {
        yield put(closeOverlayModal());
        if (window.location.href.indexOf('account')) {
          utils.routerPush('/', '/home');
        } else {
          utils.routerPush('/', `/${matchPath}`);
        }
      }
    }
  } catch (err) {
    if (!utils.isMobileApp()) {
      utils.routerPush('/', '/home');
    }
  }
}

export function* LogOutPageSaga() {
  yield takeLatest(LOGOUT_CONSTANTS.LOGOUT_APP, logoutSaga);
}

export default LogOutPageSaga;
