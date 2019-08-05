import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const applyCouponToCart = ({ coupon_code: couponCode = '' }) => {
  const payload = {
    webService: endpoints.addCoupons,
    body: {
      promoCode: couponCode.toUpperCase(),
    },
  };
  return executeStatefulAPICall(payload);
};

export default {
  applyCouponToCart,
};
