// import { createSelector } from 'reselect';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';
import { filterObject } from '../../Cart/util/utility';

export const getAddedToBagData = state => {
  return state.AddedToBagReducer.get('itemInfo');
};

export const isOpenAddedToBag = state => {
  return state.AddedToBagReducer.get('isOpenAddedToBag');
};

export const getOrderItems = state => {
  return getCartOrderDetails(state) && getCartOrderDetails(state).get('orderItems');
};

export const getQuantityValue = state => {
  let quantity = '';
  const orderItems = getOrderItems(state);
  const lastAddedToBag = getAddedToBagData(state);
  if (orderItems && lastAddedToBag) {
    const lastAddedItem = filterObject(orderItems, lastAddedToBag);
    quantity = lastAddedItem.getIn(['itemInfo', 'quantity']);
  }

  return quantity;
};

export const getLabelsAddToActions = state => {
  const {
    bag: {
      addedToBag: { lbl_cta_viewBag: viewBag, lbl_cta_checkout: checkout },
    },
  } = state.Labels;
  return {
    viewBag,
    checkout,
  };
};
