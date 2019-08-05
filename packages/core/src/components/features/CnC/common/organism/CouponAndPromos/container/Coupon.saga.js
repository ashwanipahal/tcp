import { call, takeLatest, put } from 'redux-saga/effects';
import COUPON_CONSTANTS from '../Coupon.constants';
import { hideLoader, showLoader } from './Coupon.actions';
import { applyCouponToCart } from '../../../../../../../services/abstractors/CnC';

export function* applyCoupon({ payload }) {
  yield put(showLoader());
  yield call(applyCouponToCart, payload);
  yield put(hideLoader());
}

export function* CouponSaga() {
  yield takeLatest(COUPON_CONSTANTS.APPLY_COUPON, applyCoupon);
}

export default CouponSaga;
