import ADD_GIFT_CARD_CONSTANTS from '../AddGiftCard.constants';

// @flow
export const addGiftCardRequest = (payload: {}) => {
  return {
    type: ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST,
    payload,
  };
};

export const addGiftCardSuccess = (payload: {}) => {
  return {
    type: ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_SUCCESS,
    payload,
  };
};

export const addGiftCardFailure = (payload: {}) => {
  return {
    type: ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_FAILED,
    payload,
  };
};
