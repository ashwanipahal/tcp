import { call, takeLatest, put } from 'redux-saga/effects';
import { applyCoupon, CouponSaga } from '../container/Coupon.saga';
import { applyCouponToCart } from '../../../../../../../services/abstractors/CnC';
import COUPON_ACTION_PATTERN from '../Coupon.constants';
import { hideLoader, showLoader } from '../container/Coupon.actions';

describe('Coupon saga', () => {
  it('should dispatch showLoader action', () => {
    const payload = { formPromise: {}, formData: {} };
    const applyCouponSaga = applyCoupon({ payload });
    expect(applyCouponSaga.next().value).toEqual(put(showLoader()));

    expect(applyCouponSaga.next().value).toEqual(call(applyCouponToCart, payload.formData));
    expect(applyCouponSaga.next().value).toEqual(put(hideLoader()));
  });

  it('should return correct takeLatest effect', () => {
    const takeLatestDescriptor = CouponSaga();
    expect(takeLatestDescriptor.next().value.toString()).toMatch(
      takeLatest(COUPON_ACTION_PATTERN.APPLY_COUPON, applyCoupon).toString()
    );
    expect(takeLatestDescriptor.next()).toEqual({ done: true, value: undefined });
  });
});
