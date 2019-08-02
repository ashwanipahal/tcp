/**
 * These are temporary changes for a dummy Bag page
 */
import { fromJS } from 'immutable';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

const initialState = fromJS({
  orderDetails: {},
  editableItemData: {},
});

const CartPage = (state = initialState, action) => {
  switch (action.type) {
    case CARTPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE:
      return state.set('orderDetails', fromJS(action.payload.orderDetails));

    case CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO_SUCCESS:
      return state.set('editableItemData', fromJS(action.payload.product));

    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default CartPage;
