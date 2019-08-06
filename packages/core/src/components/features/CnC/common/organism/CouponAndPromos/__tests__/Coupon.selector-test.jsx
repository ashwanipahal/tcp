import { fromJS } from 'immutable';
import { getCouponFetchingState } from '../container/Coupon.selectors';

describe('#Coupon selector', () => {
  const couponState = fromJS({
    isFetching: false,
  });
  const state = {
    CouponsAndPromos: couponState,
  };

  it('#Coupon should return isFetching state', () => {
    expect(getCouponFetchingState(state)).toEqual(couponState.get('isFetching'));
  });
});
