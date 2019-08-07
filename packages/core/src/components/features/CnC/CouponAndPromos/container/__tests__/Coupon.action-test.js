import COUPON_CONSTANTS from '../../Coupon.constants';
import { getCouponList, showLoader } from '../Coupon.actions';

describe('Coupon actions', () => {
  it('getCouponList should return action type as GET_COUPON_LIST', () => {
    expect(getCouponList().type).toBe(COUPON_CONSTANTS.GET_COUPON_LIST);
  });

  it('showLoader should return action type as SHOW_LOADER', () => {
    expect(showLoader().type).toBe(COUPON_CONSTANTS.SHOW_LOADER);
  });
});
