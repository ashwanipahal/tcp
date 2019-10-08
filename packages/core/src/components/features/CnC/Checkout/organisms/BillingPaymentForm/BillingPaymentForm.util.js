import constants from './container/CreditCard.constants';

export const getSelectedCard = ({ creditCardList, onFileCardKey }) => {
  return creditCardList.find(card => card.creditCardId === +onFileCardKey);
};

export const getCreditCardList = ({ cardList }) =>
  cardList &&
  cardList.size > 0 &&
  cardList.filter(
    card =>
      card.ccType !== constants.ACCEPTED_CREDIT_CARDS.GIFT_CARD &&
      card.ccType !== constants.ACCEPTED_CREDIT_CARDS.VENMO
  );

export const getExpirationRequiredFlag = ({ cardType }) => {
  return !cardType || cardType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD;
};
