import COUPON_CONSTANTS from '../Coupon.constants';

export const getCouponList = payload => {
  return {
    type: COUPON_CONSTANTS.GET_COUPON_LIST,
    payload,
  };
};

export const setCouponList = couponList => ({
  type: COUPON_CONSTANTS.SET_COUPON_LIST,
  couponList,
});

export const showLoader = () => ({
  type: COUPON_CONSTANTS.SHOW_LOADER,
});
