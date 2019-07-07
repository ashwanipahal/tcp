import PAYMENT_CONSTANTS from '../Payment.constants';

export const getCardList = () => ({
  type: PAYMENT_CONSTANTS.GET_CARD_LIST,
});

export const setCardList = payload => ({
  type: PAYMENT_CONSTANTS.SET_CARD_LIST,
  payload,
});

export const getCardListErr = payload => ({
  type: PAYMENT_CONSTANTS.GET_CARD_LIST_ERR,
  payload,
});
