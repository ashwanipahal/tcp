import PAYMENT_CONSTANTS from '../Payment.constants';

export const getCardList = () => ({
  type: PAYMENT_CONSTANTS.GET_CARD_LIST,
});

export const setCardList = cardList => ({
  type: PAYMENT_CONSTANTS.SET_CARD_LIST,
  cardList,
});

export const getCardListErr = err => ({
  type: PAYMENT_CONSTANTS.GET_CARD_LIST_ERR,
  err,
});

export const setDeleteModalMountedState = payload => ({
  type: PAYMENT_CONSTANTS.DELETE_MODAL_MOUNT_STATE,
  payload,
});
