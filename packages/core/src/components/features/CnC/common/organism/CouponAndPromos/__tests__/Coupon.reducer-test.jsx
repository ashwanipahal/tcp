import { fromJS } from 'immutable';
import COUPON_CONSTANTS from '../Coupon.constants';
import CouponReducer from '../container/Coupon.reducer';

describe('Coupon Reducer', () => {
  const initialState = fromJS({
    isFetching: false,
  });

  it('InitialState', () => {
    const newState = CouponReducer({ isFetching: false }, {});
    expect(newState.get('isFetching')).toEqual(false);
  });

  it('SHOW_LOADER', () => {
    const getOrderDetailAction = {
      type: COUPON_CONSTANTS.SHOW_LOADER,
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(true);
  });

  it('HIDE_LOADER', () => {
    const getOrderDetailAction = {
      type: COUPON_CONSTANTS.HIDE_LOADER,
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(false);
  });
});
