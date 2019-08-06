import { fromJS } from 'immutable';
import COUPON_CONSTANTS from '../Coupon.constants';
import CouponReducer from '../container/Coupon.reducer';

describe('Coupon Reducer', () => {
  const initialState = fromJS({
    isFetching: false,
    couponList: [],
    couponsAndOffers: [],
  });

  it('SHOW_LOADER', () => {
    const value = true;
    const getOrderDetailAction = {
      type: COUPON_CONSTANTS.SHOW_LOADER,
      payload: value,
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(value);
  });
});
