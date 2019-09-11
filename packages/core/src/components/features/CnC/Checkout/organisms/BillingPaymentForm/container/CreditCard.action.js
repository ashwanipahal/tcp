import CREDIT_CARD_CONSTANTS from './CreditCard.constants';

export const fetchModuleX = payload => {
  return {
    type: CREDIT_CARD_CONSTANTS.FETCH_MODULEX_CONTENT,
    payload,
  };
};

export const setModuleX = payload => {
  return {
    type: CREDIT_CARD_CONSTANTS.SET_MODULEX_CONTENT,
    payload,
  };
};
