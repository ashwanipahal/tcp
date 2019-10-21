/**
 * These are temporary changes for a dummy Bag page
 */

const CARTPAGE_CONSTANTS = {
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  CONFIRM_REMOVE_CART_ITEM: 'CONFIRM_REMOVE_CART_ITEM',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  REMOVE_CART_ITEM_COMPLETE: 'REMOVE_CART_ITEM_COMPLETE',
  UPDATE_CART_ITEM_COMPLETE: 'UPDATE_CART_ITEM_COMPLETE',
  SET_TOGGLE_CART_ITEM_ERROR: 'SET_TOGGLE_CART_ITEM_ERROR',
  CLEAR_TOGGLE_CART_ITEM_ERROR: 'CLEAR_TOGGLE_CART_ITEM_ERROR',
  GET_PRODUCT_SKU_INFO: 'GET_PRODUCT_SKU_INFO',
  GET_PRODUCT_SKU_INFO_SUCCESS: 'GET_PRODUCT_SKU_INFO_SUCCESS',
  AVAILABILITY_OK: 'OK',
  AVAILABILITY_SOLDOUT: 'SOLDOUT',
  AVAILABILITY_UNAVAILABLE: 'UNAVAILABLE',
  AVAILABILITY_SUGGESTED: 'SUGGESTED',
  AVAILABILITY: {
    OK: 'OK',
    SOLDOUT: 'SOLDOUT',
    UNAVAILABLE: 'UNAVAILABLE',
    REQ_QTY_UNAVAILABLE: 'REQ_QTY_UNAVAILABLE',
    BOSSINELIGIBLE: 'BOSSINELIGIBLE',
    SUGGESTED: 'SUGGESTED',
  },
  BOSS: 'BOSS',
  BOPIS: 'BOPIS',
  PICKUP_MODAL_OPEN_FROM_BAG: 'PICKUP_MODAL_OPEN_FROM_BAG',
  ECOM: 'ECOM', // REVIEW: we need it to control an state to favorite's item (favorites' page).
  BRANDS: {
    TCP: 'TCP',
    GYM: 'GYM',
  },
};

export default CARTPAGE_CONSTANTS;
