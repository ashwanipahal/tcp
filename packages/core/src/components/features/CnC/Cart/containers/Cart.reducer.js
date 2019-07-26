import { fromJS } from 'immutable';
import CART_CONSTANTS from '../Cart.constants';

const initialState = fromJS({});

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_CONSTANTS.GET_ORDER_DETAILS_COMPLETE:
      return state.set('cart', action.payload);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default CartReducer;
