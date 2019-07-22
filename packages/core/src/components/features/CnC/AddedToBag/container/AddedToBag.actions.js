import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';

export const addToCartEcom = payload => ({
  type: ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM,
  payload,
});

export const AddToCartError = payload => ({
  type: ADDEDTOBAG_CONSTANTS.SET_ADDED_TO_BAG_ERROR,
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

export const getOrderDetails = () => ({
  type: ADDEDTOBAG_CONSTANTS.GET_ORDER_DETAILS,
});

export const getOrderDetailsComplete = payload => {
  return {
    type: ADDEDTOBAG_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload,
  };
};
