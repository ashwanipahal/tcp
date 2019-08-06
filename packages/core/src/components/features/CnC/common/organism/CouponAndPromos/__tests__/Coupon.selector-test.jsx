import { fromJS } from 'immutable';
import { getCouponsLabels, getCouponFetchingState } from '../container/Coupon.selectors';

describe('#Coupon selector', () => {
  const couponState = fromJS({
    isFetching: false,
  });

  it('#Coupon should return isFetching state', () => {
    const state = {
      CouponsAndPromos: couponState,
    };
    expect(getCouponFetchingState(state)).toEqual(couponState.get('isFetching'));
  });

  it('#Coupon should return labels state', () => {
    const state = {
      Labels: {
        bag: {
          bagOverview: {},
        },
      },
    };
    expect(getCouponsLabels(state)).toEqual({
      placeholderText: undefined,
      submitButtonLabel: undefined,
      couponNeedHelpText: undefined,
      couponCodeHeader: undefined,
    });
  });
});
