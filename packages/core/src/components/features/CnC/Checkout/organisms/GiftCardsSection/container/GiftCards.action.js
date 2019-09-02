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

export default {
  applyGiftCard,
  removeGiftCard,
};
