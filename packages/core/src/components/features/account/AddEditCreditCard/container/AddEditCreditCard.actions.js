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

/**
 * @function resetSuccessState
 * action creator for type: RESET_STATE
 */
export const resetSuccessState = () => ({
  type: constants.ADD_CREDIT_CARD_RESET_SUCCESS,
});

/**
 * @function resetErrorState
 * action creator for type: RESET_STATE
 */
export const resetErrorState = () => ({
  type: constants.ADD_CREDIT_CARD_RESET_ERROR,
});
