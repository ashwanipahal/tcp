import GIFTCARD_CONSTANTS from '../GiftCards.constants';

const applyGiftCard = payload => {
  return {
    type: GIFTCARD_CONSTANTS.APPLY_GIFT_CARD,
    payload,
  };
};

const removeGiftCard = payload => {
  return {
    type: GIFTCARD_CONSTANTS.REMOVE_GIFT_CARD,
    payload,
  };
};

const addGiftCard = payload => {
  return {
    type: GIFTCARD_CONSTANTS.ADD_GIFT_CARD,
    payload,
  };
};

export default {
  applyGiftCard,
  removeGiftCard,
  addGiftCard,
};
