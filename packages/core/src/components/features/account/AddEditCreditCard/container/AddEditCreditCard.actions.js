import constants from './AddEditCreditCard.constants';

export const addCreditCard = payload => ({
  type: constants.ADD_CREDIT_CARD,
  payload,
});

export const editCreditCard = payload => ({
  type: constants.EDIT_CREDIT_CARD,
  payload,
});

export const addCreditCardSuccess = payload => ({
  type: constants.ADD_CREDIT_CARD_SUCCESS,
  payload,
});

export const addCreditCardError = payload => ({
  type: constants.ADD_CREDIT_CARD_ERROR,
  payload,
});
