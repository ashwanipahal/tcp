// import { createSelector } from 'reselect';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';
import { filterObject } from '../../Cart/util/utility';

export const getAddedToBagData = state => {
  return state.AddedToBagReducer.get('itemInfo');
};

export const isOpenAddedToBag = state => {
  return state.AddedToBagReducer.get('isOpenAddedToBag');
};

export const getQuantityValue = state => {
  let quantity = '';
  const orderItems = getCartOrderDetails(state) && getCartOrderDetails(state).orderItems;
  const lastAddedToBag = getAddedToBagData(state);
  if (orderItems && lastAddedToBag) {
    const lastAddedItem = filterObject(orderItems, lastAddedToBag);
    quantity = lastAddedItem && lastAddedItem.itemInfo.quantity;
  }

  return quantity;
};
