// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */

import { createSelector } from 'reselect';

export const getCartOrderList = state => {
  // needs to do it with get method.
  return state.CartPage && state.CartPage.orderDetails && state.CartPage.orderDetails.orderItems;
};

export const getEditableProductInfo = state => {
  // needs to do it with get method.
  return state.CartPage.editableItemData;
};

export const getCartOrderDetails = state => {
  return state.CartPage.orderDetails;
};
