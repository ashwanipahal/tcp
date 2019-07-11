import PAYMENT_CONSTANTS from '../Payment.constants';

export const getCardList = payload => ({
  type: PAYMENT_CONSTANTS.GET_CARD_LIST,
  payload,
});

export const setCardList = payload => ({
  type: PAYMENT_CONSTANTS.SET_CARD_LIST,
  payload,
});

export const getCardListErr = payload => ({
  type: PAYMENT_CONSTANTS.GET_CARD_LIST_ERR,
  payload,
});

export const setDefaultPayment = payload => ({
  type: PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT,
  payload,
});

export const setDefaultPaymentSuccess = () => ({
  type: PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT_SUCCESS,
});

export const setDefaultPaymentError = () => ({
  type: PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT_ERROR,
});

export const showLoader = () => ({
  type: PAYMENT_CONSTANTS.SHOW_LOADER,
});
