import COUPON_CONSTANTS from '../Coupon.constants';

export const applyCoupon = payload => {
  return {
    type: COUPON_CONSTANTS.APPLY_COUPON,
    payload,
  };
};

export const showLoader = () => ({
  type: COUPON_CONSTANTS.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: COUPON_CONSTANTS.HIDE_LOADER,
});

export const getCouponList = payload => {
  return {
    type: COUPON_CONSTANTS.GET_COUPON_LIST,
    payload,
  };
};

export const setError = payload => {
  return {
    type: COUPON_CONSTANTS.SET_ERROR,
    payload,
  };
};
