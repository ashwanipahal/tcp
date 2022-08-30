import { fromJS } from 'immutable';
import PRODUCT_PICKUP_ACTIONS_CONSTANTS from '../ProductPickup.constants';

const initialState = {
  bopisInventoryDetails: {},
};

const ProductPickupReducer = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case PRODUCT_PICKUP_ACTIONS_CONSTANTS.SET_BOPIS_INVENTORY:
      return state.set('bopisInventoryDetails', action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default ProductPickupReducer;
