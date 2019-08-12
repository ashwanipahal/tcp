import { call, takeLatest, put } from 'redux-saga/effects';
import COUPON_CONSTANTS from '../Coupon.constants';
import { hideLoader, showLoader, setStatus, setError } from './Coupon.actions';
import BagPageAction from '../../../../BagPage/container/BagPage.actions';
import {
  applyCouponToCart,
  removeCouponOrPromo,
} from '../../../../../../../services/abstractors/CnC';
import { COUPON_STATUS } from '../../../../../../../services/abstractors/CnC/CartItemTile';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* applyCoupon({ payload }) {
  const {
    formData,
    formPromise: { resolve, reject },
    source,
    coupon,
  } = payload;
  if (coupon) {
    const oldStatus = coupon && coupon.status;
    try {
      yield put(showLoader());
      yield put(setStatus({ promoCode: coupon.id, status: COUPON_STATUS.APPLYING }));
      yield call(applyCouponToCart, formData);
      yield put(setStatus({ promoCode: coupon.id, status: COUPON_STATUS.APPLIED }));
      yield put(BagPageAction.getCartData());
      yield put(hideLoader());
      resolve();
    } catch (e) {
      if (source !== 'form') {
        // eslint-disable-next-line
        yield put(setError({ msg: e.errors._error.msg, couponCode: formData.couponCode }));
        yield delay(3000);
        yield put(setError({ msg: null, couponCode: formData.couponCode }));
      }
      yield put(setStatus({ promoCode: coupon.id, status: oldStatus }));
      yield put(hideLoader());
    }
  } else {
    try {
      yield put(showLoader());
      yield call(applyCouponToCart, formData);
      yield put(BagPageAction.getCartData());
      yield put(hideLoader());
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
    formPromise: { resolve, reject },
  } = payload;
  const formData = { couponCode: coupon.id };
  const oldStatus = coupon && coupon.status;
  try {
    yield put(showLoader());
    yield put(setStatus({ promoCode: coupon.id, status: COUPON_STATUS.REMOVING }));
    yield call(removeCouponOrPromo, formData);
    yield put(BagPageAction.getCartData());
    yield put(setStatus({ promoCode: coupon.id, status: COUPON_STATUS.REMOVING }));
    yield put(hideLoader());
    resolve();
  } catch (e) {
    // eslint-disable-next-line
    yield put(setError({ msg: e.errors._error.msg, couponCode: formData.couponCode }));
    yield delay(3000);
    yield put(setError({ msg: null, couponCode: formData.couponCode }));
    yield put(hideLoader());
    yield put(setStatus({ promoCode: coupon.id, status: oldStatus }));
    reject(e);
  }
}

export function* CouponSaga() {
  yield takeLatest(COUPON_CONSTANTS.APPLY_COUPON, applyCoupon);
  yield takeLatest(COUPON_CONSTANTS.REMOVE_COUPON, removeCoupon);
}

export default CouponSaga;
