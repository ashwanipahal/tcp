import GIFTCARD_CONSTANTS from '../GiftCards.constants';

const applyGiftCard = payload => {
  return {
    type: GIFTCARD_CONSTANTS.APPLY_GIFT_CARD,
    payload,
  };
};

const removeGiftCard = piId => {
  return {
    type: GIFTCARD_CONSTANTS.REMOVE_GIFT_CARD,
    piId,
  };
};

const setGiftCardError = payload => {
  return {
    type: GIFTCARD_CONSTANTS.SET_GIFTCARD_ERROR,
    payload,
  };
};

const resetGiftCardError = () => {
  return {
    type: GIFTCARD_CONSTANTS.RESET_GIFTCARD_ERROR,
  };
};

export default {
  applyGiftCard,
  removeGiftCard,
  setGiftCardError,
  resetGiftCardError,
};
