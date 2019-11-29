import { call, takeLatest, put, take } from 'redux-saga/effects';
import BAG_PAGE_ACTIONS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.actions';
import { setClickAnalyticsData, trackPageView } from '@tcp/core/src/analytics/actions';
import LOGOUT_CONSTANTS from '../LogOut.constants';
import { resetUserInfo } from '../../User/container/User.actions';
import CONSTANTS from '../../User/User.constants';
import { closeOverlayModal } from '../../OverlayModal/container/OverlayModal.actions';
import { routerPush, isMobileApp, scrollPage } from '../../../../../utils';
import { navigateXHRAction } from '../../NavigateXHR/container/NavigateXHR.action';
import { LogoutApplication } from '../../../../../services/abstractors/account';
import {
  resetWalletAppState,
  resetCouponReducer,
  getCouponList,
} from '../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';
import { setFavStoreToLocalStorage } from '../../../storeLocator/StoreLanding/container/utils/userFavStore';
import { setCheckoutModalMountedState } from '../../LoginPage/container/LoginPage.actions';
import { getUserInfo } from '../../User/container/User.actions';
import { resetAirmilesReducer } from '../../../CnC/common/organism/AirmilesBanner/container/AirmilesBanner.actions';
import CHECKOUT_ACTIONS from '../../../CnC/Checkout/container/Checkout.action';

export function* logoutSaga() {
  try {
    const res = yield call(LogoutApplication);

    if (res.statusCode === 200) {
      if (isMobileApp()) {
        yield put(resetWalletAppState());
      }
      yield put(resetUserInfo());
      yield put(
        navigateXHRAction({
          headers: {
            actionTaken: 'logout',
          },
        })
      );
      yield put(
        setClickAnalyticsData({
          customEvents: ['event80'],
        })
      );
      yield put(CHECKOUT_ACTIONS.resetCheckoutReducer());
      yield put(resetAirmilesReducer());
      yield put(resetCouponReducer());
      yield put(BAG_PAGE_ACTIONS.resetCartReducer());
      yield put(getUserInfo({ ignoreCache: true }));
      if (!isMobileApp()) {
        setFavStoreToLocalStorage(null);
        yield put(closeOverlayModal());
        yield put(setCheckoutModalMountedState({ state: false }));
        if (
          window.location.href.includes('account') ||
          window.location.href.includes('checkout/confirmation')
        ) {
          routerPush('/', '/home');
          scrollPage();
        } else {
          scrollPage();
        }
      }

      // Trgigger analytics event after reset user data
      yield take(CONSTANTS.RESET_USER_INFO);
      yield put(trackPageView());
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
