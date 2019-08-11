import { call, takeLatest, put } from 'redux-saga/effects';
import COUPON_CONSTANTS from '../Coupon.constants';
import { hideLoader, showLoader, setError } from './Coupon.actions';
import { applyCouponToCart } from '../../../../../../../services/abstractors/CnC';

export function* applyCoupon({ payload }) {
  const {
    formData,
    source,
    formPromise: { resolve, reject },
  } = payload;
  try {
    yield put(showLoader());
    yield call(applyCouponToCart, formData);
    yield put(hideLoader());
    resolve();
  } catch (e) {
    if (source !== 'form') {
      // eslint-disable-next-line
      yield put(setError({ msg: e.errors._error.msg, couponCode: formData.couponCode }));
    }
    yield put(hideLoader());
    reject(e);
  }
}

export function* CouponSaga() {
  yield takeLatest(COUPON_CONSTANTS.APPLY_COUPON, applyCoupon);
}

export default CouponSaga;
