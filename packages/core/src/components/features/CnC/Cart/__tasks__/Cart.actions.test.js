import { getOrderDetails, getOrderDetailsComplete } from '../containers/Cart.actions';
import CART_CONSTANTS from '../Cart.constants';

describe('Cart actions', () => {
  it('getOrderDetails should return action type as GET_ORDER_DETAILS', () => {
    expect(getOrderDetails().type).toBe(CART_CONSTANTS.GET_ORDER_DETAILS);
  });

  it('getOrderDetailsComplete should return action type as GET_ORDER_DETAILS_COMPLETE', () => {
    expect(getOrderDetailsComplete().type).toBe(CART_CONSTANTS.GET_ORDER_DETAILS_COMPLETE);
  });
});
