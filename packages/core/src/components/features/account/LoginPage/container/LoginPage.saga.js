import { call, takeLatest, put, select, take } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { setLoginModalMountedState } from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.actions';
import { setClickAnalyticsData, trackClick } from '@tcp/core/src/analytics/actions';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';
import CONSTANTS from '../../User/User.constants';
import {
  setLoginInfo,
  setCheckoutModalMountedState,
  setLoginLoadingState,
} from './LoginPage.actions';
import { navigateXHRAction } from '../../NavigateXHR/container/NavigateXHR.action';
import { getUserInfo, setUserInfo } from '../../User/container/User.actions';
import fetchData from '../../../../../service/API';
import { login } from '../../../../../services/abstractors/account';
import endpoints from '../../../../../service/endpoint';
import { checkoutModalOpenState } from './LoginPage.selectors';
import { openOverlayModal } from '../../OverlayModal/container/OverlayModal.actions';

const errorLabel = 'Error in API';

const notIsLocalHost = siteOrigin => {
  return siteOrigin.indexOf('local') === -1;
};

export function* loginSaga({ payload, afterLoginHandler }) {
  yield put(setLoginLoadingState({ isLoading: true }));
  try {
    const response = yield call(login, payload);
    if (response.success) {
      yield put(setLoginLoadingState({ isLoading: false }));
      yield put(getUserInfo());
      yield put(setLoginModalMountedState({ state: false }));
      yield put(
        setClickAnalyticsData({
          eventName: 'login',
          customEvents: ['event14'],
          pageNavigationText: 'header-log in',
        })
      );
      if (afterLoginHandler) {
        yield call(afterLoginHandler);
      } else {
        yield put(
          openOverlayModal({
            component: 'accountDrawer',
            variation: 'primary',
          })
        );
      }
      yield put(navigateXHRAction());

      // Trgigger analytics event after set user data
      yield take(CONSTANTS.SET_USER_INFO);
      yield put(trackClick({ name: 'user_login', module: 'account' }));
    }

    return yield put(setLoginInfo(response));
  } catch (err) {
    yield put(setLoginLoadingState({ isLoading: false }));
    const { errorCode, errorMessage, errorResponse } = err;
    yield put(
      setLoginInfo({
        success: false,
        ...errorResponse,
        errorCode,
        errorMessage,
      })
    );

    const isCheckoutModalOpen = yield select(checkoutModalOpenState);
    if (isCheckoutModalOpen) {
      yield put(setCheckoutModalMountedState({ state: true }));
    }
    return null;
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
    logger.info(errorLabel);
    logger.info(err);
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
    logger.error(errorLabel);
    logger.error(err);
  }
}

export function* LoginPageSaga() {
  yield takeLatest(LOGINPAGE_CONSTANTS.LOGIN, loginSaga);
  yield takeLatest('GET_ORDER_DETAIL', getOrderDetailSaga);
  yield takeLatest('GET_USER_DETAIL_POC', getUserInfoPOCSaga);
}

export default LoginPageSaga;
