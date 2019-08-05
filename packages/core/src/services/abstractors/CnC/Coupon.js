import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const getCouponListData = () => {
  const payload = {
    webService: endpoints.getCouponList,
    header: {
      fromPage: 'Coupon',
    },
  };
  return executeStatefulAPICall(payload).then(res => {
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return res.body.contact || [];
  });
};

export default {
  getCouponListData,
};
