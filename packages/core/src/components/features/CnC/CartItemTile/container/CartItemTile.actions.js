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

export const removeCartItemComplete = () => {
  return {
    type: CARTPAGE_CONSTANTS.REMOVE_CART_ITEM_COMPLETE,
  };
};

export const openPickupModalWithValuesFromBag = payload => {
  return {
    payload,
    type: CARTPAGE_CONSTANTS.PICKUP_MODAL_OPEN_FROM_BAG,
  };
};

export const confirmRemoveCartItem = (payload, afterHandler) => {
  return {
    type: CARTPAGE_CONSTANTS.CONFIRM_REMOVE_CART_ITEM,
    payload,
    afterHandler,
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

export const setToggleCartItemError = payload => {
  return {
    type: CARTPAGE_CONSTANTS.SET_TOGGLE_CART_ITEM_ERROR,
    payload,
  };
};

export const clearToggleCartItemError = () => {
  return {
    type: CARTPAGE_CONSTANTS.CLEAR_TOGGLE_CART_ITEM_ERROR,
  };
};
