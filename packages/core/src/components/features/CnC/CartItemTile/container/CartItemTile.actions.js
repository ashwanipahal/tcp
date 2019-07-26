/**
 * These are temporary changes for a dummy Bag page
 */
// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */

import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

export const getOrderDetails = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.GET_ORDER_DETAILS,
  };
};

export const getOrderDetailsComplete = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload,
  };
};

export const removeCartItem = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.REMOVE_CART_ITEM,
    payload,
  };
};

export const removeCartItemComplete = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.REMOVE_CART_ITEM_COMPLETE,
  };
};

export const updateCartItem = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.UPDATE_CART_ITEM,
    payload,
  };
};

export const updateCartItemComplete = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.UPDATE_CART_ITEM_COMPLETE,
  };
};
