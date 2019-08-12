import { fromJS, List } from 'immutable';
import COUPON_CONSTANTS from '../Coupon.constants';
import BAGPAGE_CONSTANTS from '../../../../BagPage/BagPage.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../../../utils/cache.util';

const initialState = fromJS({
  isFetching: false,
  couponList: [],
  couponsAndOffers: [],
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (!(state instanceof fromJS)) {
    return fromJS(state);
  }
  return state;
};

const CouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUPON_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case BAGPAGE_CONSTANTS.SET_COUPONS_DATA:
    case COUPON_CONSTANTS.SET_COUPON_LIST:
      return state
        .set('isFetching', false)
        .set('couponsAndOffers', List(action.payload))
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(COUPON_CONSTANTS.GET_COUPON_LIST_TTL));
    case COUPON_CONSTANTS.HIDE_LOADER:
      return state.set('isFetching', false);
    case COUPON_CONSTANTS.SET_STATUS_COUPON:
      return state.set('isFetching', false).set(
        'couponsAndOffers',
        state.get('couponsAndOffers').map(coupon => {
          if (coupon.id === action.payload.promoCode)
            return { ...coupon, labelStatus: action.payload.status };
          return coupon;
        })
      );
    case COUPON_CONSTANTS.SET_ERROR:
      return state.set('isFetching', false).set(
        'couponsAndOffers',
        state.get('couponsAndOffers').map(promo => {
          return promo.id === action.payload.couponCode
            ? { ...promo, error: action.payload.msg }
            : promo;
        })
      );
    default:
      return getDefaultState(state);
  }
};

export default CouponReducer;
