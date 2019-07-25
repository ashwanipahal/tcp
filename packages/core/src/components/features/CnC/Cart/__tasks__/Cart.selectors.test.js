import { fromJS } from 'immutable';
import getOrderDetails from '../containers/Cart.selectors';

describe('#Cart selector', () => {
  it('#getCartState should return cartReducer state', () => {
    const orderDetailsState = fromJS({
      orderId: '',
    });
    const state = {
      CartReducer: orderDetailsState,
    };
    expect(getOrderDetails(state)).toEqual(orderDetailsState.get('cart'));
  });
});
