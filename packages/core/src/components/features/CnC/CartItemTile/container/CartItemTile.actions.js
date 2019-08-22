/**
 * These are temporary changes for a dummy Bag page
 */

import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

export const removeCartItem = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.REMOVE_CART_ITEM,
    payload,
  };
};

export const getProductSKUInfo = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO,
    payload,
  };
};

export const getProductSKUInfoSuccess = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO_SUCCESS,
    payload,
  };
};

export const updateCartItem = (payload?) => {
  return {
    type: CARTPAGE_CONSTANTS.UPDATE_CART_ITEM,
    payload,
  };
};

export const updateCartItemComplete = () => {
  return {
    type: CARTPAGE_CONSTANTS.UPDATE_CART_ITEM_COMPLETE,
  };
};
