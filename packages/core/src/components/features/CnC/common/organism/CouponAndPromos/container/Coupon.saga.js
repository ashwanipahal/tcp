import { call, takeLatest, put, delay, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import COUPON_CONSTANTS from '../Coupon.constants';
import { hideLoader, showLoader, setStatus, setError, setCouponList } from './Coupon.actions';
import BagPageAction from '../../../../BagPage/container/BagPage.actions';
import BagPageSelectors from '../../../../BagPage/container/BagPage.selectors';
import {
  applyCouponToCart,
  removeCouponOrPromo,
  getAllCoupons as getAllCouponsAbstractor,
} from '../../../../../../../services/abstractors/CnC';
import {
  COUPON_STATUS,
  BUTTON_LABEL_STATUS,
} from '../../../../../../../services/abstractors/CnC/CartItemTile';

export function* applyCoupon({ payload }) {
  const {
    formData,
    formPromise: { resolve, reject },
    source,
    coupon,
    fullPageInfo,
  } = payload;
  if (coupon) {
    let oldStatus = coupon.status;
    if (coupon.status === COUPON_STATUS.AVAILABLE) {
      oldStatus = BUTTON_LABEL_STATUS.APPLY;
    } else if (coupon.status === COUPON_STATUS.APPLIED) {
      oldStatus = BUTTON_LABEL_STATUS.REMOVE;
    }

    try {
      yield put(showLoader());
      yield put(setStatus({ promoCode: coupon.id, status: COUPON_STATUS.APPLYING }));
      const labels = yield select(BagPageSelectors.getErrorMapping);
      yield call(applyCouponToCart, formData, labels);
      yield put(hideLoader());
      yield put(setStatus({ promoCode: coupon.id, status: COUPON_STATUS.APPLIED }));
      yield put(
        BagPageAction.getCartData({
          recalcRewards: true,
          isRecalculateTaxes: true,
          translation: false,
          excludeCartItems: !fullPageInfo,
        })
      );
      resolve();
    } catch (e) {
      yield put(setStatus({ promoCode: coupon.id, status: oldStatus }));
      yield put(hideLoader());
      if (source !== 'form') {
        // eslint-disable-next-line
        yield put(setError({ msg: e.errors._error.msg, couponCode: formData.couponCode }));
      }
    }
  } else {
    try {
      yield put(showLoader());
      const labels = yield select(BagPageSelectors.getErrorMapping);
      yield call(applyCouponToCart, formData, labels);
      yield put(hideLoader());
      yield put(
        BagPageAction.getCartData({
          recalcRewards: true,
          isRecalculateTaxes: true,
          translation: false,
          excludeCartItems: !fullPageInfo,
        })
      );
      resolve();
    } catch (e) {
      yield put(hideLoader());
      reject(e);
    }
  }
}

export function* removeCoupon({ payload }) {
  const {
    coupon,
    fullPageInfo,
    formPromise: { resolve, reject },
  } = payload;
  const formData = { couponCode: coupon.id };
  let oldStatus = coupon.status;
  if (coupon.status === COUPON_STATUS.AVAILABLE) {
    oldStatus = BUTTON_LABEL_STATUS.APPLY;
  } else if (coupon.status === COUPON_STATUS.APPLIED) {
    oldStatus = BUTTON_LABEL_STATUS.REMOVE;
  }
  try {
    yield put(showLoader());
    yield put(setStatus({ promoCode: coupon.id, status: COUPON_STATUS.REMOVING }));
    yield call(removeCouponOrPromo, formData);
    yield put(
      BagPageAction.getCartData({
        recalcRewards: true,
        isRecalculateTaxes: true,
        translation: false,
        excludeCartItems: !fullPageInfo,
      })
    );
    yield put(setStatus({ promoCode: coupon.id, status: COUPON_STATUS.REMOVING }));
    yield put(hideLoader());
    resolve();
  } catch (e) {
    yield put(hideLoader());
    yield put(setStatus({ promoCode: coupon.id, status: oldStatus }));
    // eslint-disable-next-line
    yield put(setError({ msg: e.errors._error.msg, couponCode: formData.couponCode }));
    yield delay(5000);
    yield put(setError({ msg: null, couponCode: formData.couponCode }));
    reject(e);
  }
}

export function* getAllCoupons() {
  try {
    const coupons = yield call(getAllCouponsAbstractor);
    yield put(setCouponList(coupons));
  } catch (e) {
    logger.error('getAllCoupons error', e);
  }
}

export function* CouponSaga() {
  yield takeLatest(COUPON_CONSTANTS.APPLY_COUPON, applyCoupon);
  yield takeLatest(COUPON_CONSTANTS.REMOVE_COUPON, removeCoupon);
  yield takeLatest(COUPON_CONSTANTS.GET_COUPON_LIST, getAllCoupons);
}

export default CouponSaga;
