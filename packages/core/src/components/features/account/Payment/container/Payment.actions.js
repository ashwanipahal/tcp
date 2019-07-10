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

export const setDeleteModalMountedState = payload => ({
  type: PAYMENT_CONSTANTS.DELETE_MODAL_MOUNT_STATE,
  payload,
});

export const deleteCard = payload => ({
  type: PAYMENT_CONSTANTS.DELETE_CARD,
  payload,
});

export const updateCardCardListonDelete = payload => ({
  type: PAYMENT_CONSTANTS.UPDATE_CARD_LIST_ON_DELETE,
  payload,
});
export const updateCardListonDeleteErr = payload => ({
  type: PAYMENT_CONSTANTS.UPDATE_CARD_LIST_ON_DELETE_ERR,
  payload,
});

export const checkBalance = payload => ({
  type: PAYMENT_CONSTANTS.CHECK_BALANCE,
  payload,
});

export const setcheckBalance = payload => ({
  type: PAYMENT_CONSTANTS.SET_CHECK_BALANCE,
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
