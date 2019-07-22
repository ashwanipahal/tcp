// import { createSelector } from 'reselect';

export const getAddedToBagData = state => {
  return state.AddedToBagReducer.get('itemInfo');
};

export const isOpenAddedToBag = state => {
  return state.AddedToBagReducer.get('isOpenAddedToBag');
};

export const getCartOrderList = state => {
  return state.AddedToBagReducer.get('orders');
};
