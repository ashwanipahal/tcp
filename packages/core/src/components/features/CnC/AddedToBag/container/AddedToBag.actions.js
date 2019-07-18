import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';

export const addToCartEcom = payload => ({
  type: ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM,
  payload,
});

export const AddToCartError = payload => ({
  type: ADDEDTOBAG_CONSTANTS.SET_CARD_LIST,
  payload,
});

// export const getCardListErr = payload => ({
//   type: PAYMENT_CONSTANTS.GET_CARD_LIST_ERR,
//   payload,
// });
