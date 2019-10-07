import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';

export const addToCartEcom = payload => ({
  type: ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM,
  payload,
});
export const addItemToCartBopis = payload => ({
  type: ADDEDTOBAG_CONSTANTS.ADD_TO_CART_BOPIS,
  payload,
});

export const AddToCartError = payload => ({
  type: ADDEDTOBAG_CONSTANTS.SET_ADDED_TO_BAG_ERROR,
  payload,
});

export const AddToPickupError = payload => ({
  type: ADDEDTOBAG_CONSTANTS.SET_ADDED_TO_PICKUP_ERROR,
  payload,
});

export const SetAddedToBagData = payload => ({
  type: ADDEDTOBAG_CONSTANTS.SET_ADDED_TO_BAG,
  payload,
});

export const openAddedToBag = () => ({
  type: ADDEDTOBAG_CONSTANTS.OPEN_ADDED_TO_BAG,
});

export const closeAddedToBag = () => ({
  type: ADDEDTOBAG_CONSTANTS.CLOSE_ADDED_TO_BAG,
});

export const clearAddToPickupErrorState = () => ({
  type: ADDEDTOBAG_CONSTANTS.CLEAR_ADD_TO_PICKUP_ERROR_STATE,
});

export const clearAddToBagErrorState = () => ({
  type: ADDEDTOBAG_CONSTANTS.CLEAR_ADD_TO_BAG_ERROR_STATE,
});
