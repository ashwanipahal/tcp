import { call, takeLatest, put, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import BAG_PAGE_ACTIONS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.actions';
import LOGINPAGE_CONSTANTS from '../LoginPage.constants';
import { setLoginInfo, setCheckoutModalMountedState } from './LoginPage.actions';
import { navigateXHRAction } from '../../NavigateXHR/container/NavigateXHR.action';
import { getUserInfo } from '../../User/container/User.actions';
import fetchData from '../../../../../service/API';
import { login } from '../../../../../services/abstractors/account';
import endpoints from '../../../../../service/endpoint';
import { checkoutModalOpenState } from './LoginPage.selectors';
import { openOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';

const errorLabel = 'Error in API';

const notIsLocalHost = siteOrigin => {
  return siteOrigin.indexOf('local') === -1;
};

export function* loginSaga({ payload, afterLoginHandler }) {
  try {
    const response = yield call(login, payload);
    if (response.success) {
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
      // Provide check for current page and depending on that make Cart or OrderDetails call.
      yield put(BAG_PAGE_ACTIONS.getCartData());
      // yield put(BAG_PAGE_ACTIONS.getOrderDetails());
      return yield put(getUserInfo());
    }
    return yield put(setLoginInfo(response));
  } catch (err) {
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
