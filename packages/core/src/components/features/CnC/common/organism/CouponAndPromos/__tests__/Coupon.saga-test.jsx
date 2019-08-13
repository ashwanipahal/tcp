import { call, takeLatest, put } from 'redux-saga/effects';
import { applyCoupon, CouponSaga, removeCoupon, getAllCoupons } from '../container/Coupon.saga';
import { applyCouponToCart } from '../../../../../../../services/abstractors/CnC';
import COUPON_ACTION_PATTERN from '../Coupon.constants';
import { hideLoader, showLoader, setCouponList } from '../container/Coupon.actions';

const couponData = {
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
};

describe('Coupon saga', () => {
  it('should dispatch showLoader applyCoupon action', () => {
    const payload = { formPromise: {}, formData: {}, source: '' };
    const applyCouponSaga = applyCoupon({ payload });
    expect(applyCouponSaga.next().value).toEqual(put(showLoader()));
    expect(applyCouponSaga.next().value).toEqual(call(applyCouponToCart, payload.formData));
    expect(applyCouponSaga.next().value).toEqual(put(hideLoader()));
  });

  it('should dispatch showLoader with coupon data applyCoupon ', () => {
    const payload = {
      formPromise: {},
      formData: {},
      coupon: couponData,
      source: '',
    };
    const applyCouponSaga = applyCoupon({ payload });
    expect(applyCouponSaga.next().value).toEqual(put(showLoader()));
    applyCouponSaga.next();
    expect(applyCouponSaga.next().value).toEqual(call(applyCouponToCart, payload.formData));
    expect(applyCouponSaga.next().value).toEqual(put(hideLoader()));
  });

  it('should dispatch showLoader with coupon with error ', () => {
    const payload = {
      formPromise: {},
      formData: {},
      coupon: couponData,
      source: 'data',
    };
    const applyCouponSaga = applyCoupon({ payload });
    expect(applyCouponSaga.next().value).toEqual(put(showLoader()));
    applyCouponSaga.next();
    expect(applyCouponSaga.next().value).toEqual(call(applyCouponToCart, payload.formData));
    expect(applyCouponSaga.next().value).toEqual(put(hideLoader()));
  });

  it('should dispatch showLoader with removeCouponOrPromo coupon', () => {
    const payload = {
      formPromise: {},
      formData: {},
      coupon: couponData,
    };
    const removeCouponSaga = removeCoupon({ payload });
    expect(removeCouponSaga.next().value).toEqual(put(showLoader()));
    removeCouponSaga.next();
    removeCouponSaga.next();
    removeCouponSaga.next();
    removeCouponSaga.next();
    expect(removeCouponSaga.next().value).toEqual(put(hideLoader()));
  });

  it('should return correct takeLatest applyCoupon effect', () => {
    const takeLatestDescriptor = CouponSaga();
    expect(takeLatestDescriptor.next().value.toString()).toMatch(
      takeLatest(COUPON_ACTION_PATTERN.APPLY_COUPON, applyCoupon).toString()
    );
  });

  it('should return correct takeLatest removeCoupon effect', () => {
    const takeLatestDescriptor = CouponSaga();
    takeLatestDescriptor.next();
    expect(takeLatestDescriptor.next().value.toString()).toMatch(
      takeLatest(COUPON_ACTION_PATTERN.REMOVE_COUPON, removeCoupon).toString()
    );
  });

  describe('getAllCoupons', () => {
    let gen;

    beforeEach(() => {
      gen = getAllCoupons();
      gen.next();
    });

    it('should dispatch setCouponList on success', () => {
      const putDescriptor = gen.next({}).value;
      expect(putDescriptor).toEqual(put(setCouponList({})));
    });
  });
});
