/**
 * These are temporary changes for a dummy Bag page
 */
// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
import { fromJS, List } from 'immutable';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  items: [],
});

const CartPage = (state = initialState, action) => {
  switch (action.type) {
    case CARTPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE:
      return Object.assign({}, state, {
        items: action.payload.orderDetails.orderItems,
      });
    default:
      return state;
  }
};

export default CartPage;
