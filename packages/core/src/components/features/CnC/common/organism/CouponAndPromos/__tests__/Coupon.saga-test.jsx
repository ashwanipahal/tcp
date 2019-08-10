import { call, takeLatest, put } from 'redux-saga/effects';
import { applyCoupon, CouponSaga } from '../container/Coupon.saga';
import { applyCouponToCart } from '../../../../../../../services/abstractors/CnC';
import COUPON_ACTION_PATTERN from '../Coupon.constants';
import { hideLoader, showLoader } from '../container/Coupon.actions';

describe('Coupon saga', () => {
  it('should dispatch showLoader action', () => {
    const payload = { formPromise: {}, formData: {}, coupon: {}, source: '' };
    const applyCouponSaga = applyCoupon({ payload });
    expect(applyCouponSaga.next().value).toEqual(put(showLoader()));
    applyCouponSaga.next();
    expect(applyCouponSaga.next().value).toEqual(call(applyCouponToCart, payload.formData));
    applyCouponSaga.next();
    applyCouponSaga.next();
    expect(applyCouponSaga.next().value).toEqual(put(hideLoader()));
  });

  it('should dispatch showLoader with coupon data ', () => {
    const payload = {
      formPromise: {},
      formData: {},
      coupon: {
        id: 'Y00105579',
        status: 'available',
        isExpiring: false,
        title: '$10 off $50 Gymboree ONLY',
        detailsOpen: false,
        expirationDate: '12/31/99',
        effectiveDate: '7/31/19',
        details: null,
        legalText: '$10 off $50 Gymboree ONLY',
        isStarted: true,
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '9999-12-31T18:29:5.999Z',
      },
      source: '',
    };
    const applyCouponSaga = applyCoupon({ payload });
    expect(applyCouponSaga.next().value).toEqual(put(showLoader()));
    applyCouponSaga.next();
    expect(applyCouponSaga.next().value).toEqual(call(applyCouponToCart, payload.formData));
    applyCouponSaga.next();
    applyCouponSaga.next();
    expect(applyCouponSaga.next().value).toEqual(put(hideLoader()));
  });

  it('should return correct takeLatest effect', () => {
    const takeLatestDescriptor = CouponSaga();
    expect(takeLatestDescriptor.next().value.toString()).toMatch(
      takeLatest(COUPON_ACTION_PATTERN.APPLY_COUPON, applyCoupon).toString()
    );
    takeLatestDescriptor.next();
    expect(takeLatestDescriptor.next()).toEqual({ done: true, value: undefined });
  });
});
