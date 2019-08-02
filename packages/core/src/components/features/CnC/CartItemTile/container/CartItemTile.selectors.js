// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */

import { createSelector } from 'reselect';

export const getCartOrderList = state => {
  // needs to do it with get method.
  return state.getIn(['CartPageReducer', 'orderDetails', 'orderItems']);
};

export const getEditableProductInfo = state => {
  // needs to do it with get method.
  return state.CartPageReducer.get('editableItemData');
};

export const getCartOrderDetails = state => {
  return state.CartPageReducer.get('orderDetails');
};
