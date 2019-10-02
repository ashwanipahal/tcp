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

export const setCouponList = payload => {
  return {
    type: COUPON_CONSTANTS.SET_COUPON_LIST,
    payload,
  };
};

export const removeCoupon = payload => {
  return {
    type: COUPON_CONSTANTS.REMOVE_COUPON,
    payload,
  };
};

export const setStatus = payload => {
  return {
    type: COUPON_CONSTANTS.SET_STATUS_COUPON,
    payload,
  };
};

export const setError = payload => {
  return {
    type: COUPON_CONSTANTS.SET_ERROR,
    payload,
  };
};

export const clearCouponTTL = () => {
  return {
    type: COUPON_CONSTANTS.CLEAR_COUPON_TTL,
  };
};

export const resetWalletAppState = () => {
  return {
    type: COUPON_CONSTANTS.RESET_COUPON_STATE,
  };
};

/**
 * @function resetCouponReducer
 * action creator for type: RESET_COUPON_REDUCER
 */
export const resetCouponReducer = () => {
  return {
    type: COUPON_CONSTANTS.RESET_COUPON_REDUCER,
  };
};
