/**
 * These are temporary changes for a dummy Bag page
 */
import { fromJS } from 'immutable';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

const initialState = fromJS({
  editableItemData: {},
});

const CartPage = (state = initialState, action) => {
  switch (action.type) {
    case CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO_SUCCESS:
      return state.set('editableItemData', fromJS(action.payload.product));
    case CARTPAGE_CONSTANTS.SET_TOGGLE_CART_ITEM_ERROR:
      return state.set('toggleError', action.payload);
    case CARTPAGE_CONSTANTS.CLEAR_TOGGLE_CART_ITEM_ERROR:
      return state.set('toggleError', null);
    default:
      /* istanbul ignore else */
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default CartPage;
