import { fromJS, Map } from 'immutable';
import CartReducer from '../containers/Cart.reducer';
import constants from '../Cart.constants';

describe('CartReducer reducer', () => {
  it('should handle success getOrderDetails', () => {
    const initialState = fromJS({});
    expect(
      CartReducer(initialState, {
        type: constants.GET_ORDER_DETAILS_COMPLETE,
        payload: {
          orderId: '12345',
        },
      })
    ).toEqual(
      Map({
        cart: { orderId: '12345' },
      })
    );
  });
});
