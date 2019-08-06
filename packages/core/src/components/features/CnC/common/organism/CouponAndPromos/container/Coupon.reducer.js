import { fromJS } from 'immutable';
import COUPON_CONSTANTS from '../Coupon.constants';

const initialState = fromJS({
  isFetching: false,
  couponList: [],
  couponsAndOffers: [],
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const CouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUPON_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', action.payload);
    default:
      return getDefaultState(state);
  }
};

export default CouponReducer;
