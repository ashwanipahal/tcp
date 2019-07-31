/**
 * These are temporary changes for a dummy Bag page
 */
import { fromJS } from 'immutable';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  orderDetails: {},
  editableItemData: {},
});

const CartPage = (state = initialState, action) => {
  switch (action.type) {
    case CARTPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE:
      return Object.assign({}, state, {
        orderDetails: action.payload.orderDetails,
      });
    case CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO_SUCCESS:
      return Object.assign({}, state, {
        editableItemData: action.payload.product,
      });
    default:
      return state;
  }
};

export default CartPage;
