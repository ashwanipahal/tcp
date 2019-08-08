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
