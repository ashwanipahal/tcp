import { call, takeLatest, put } from 'redux-saga/effects';
import { applyCoupon, CouponSaga } from '../container/Coupon.saga';
import { applyCouponToCart } from '../../../../../../../services/abstractors/CnC';
import COUPON_ACTION_PATTERN from '../Coupon.constants';
import { hideLoader, showLoader } from '../container/Coupon.actions';

describe('Coupon saga', () => {
  it('should dispatch showLoader action', () => {
    const payload = {};
    const applyCouponSaga = applyCoupon({ payload });
    expect(applyCouponSaga.next().value).toEqual(put(showLoader));

    expect(applyCouponSaga.next().value).toEqual(call(applyCouponToCart, payload));
    expect(applyCouponSaga.next().value).toEqual(put(hideLoader));
    expect(applyCouponSaga.next()).toEqual({ done: true, value: undefined });
  });

  it('should return correct takeLatest effect', () => {
    const takeLatestDescriptor = CouponSaga();
    expect(takeLatestDescriptor.next().value.toString()).toMatch(
      takeLatest(COUPON_ACTION_PATTERN.APPLY_COUPON, applyCoupon).toString()
    );
    expect(takeLatestDescriptor.next()).toEqual({ done: true, value: undefined });
  });
});
