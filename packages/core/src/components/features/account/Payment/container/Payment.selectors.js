import { createSelector } from 'reselect';

export const getCardListState = state => {
  return state.PaymentReducer.get('cardList');
};

export const getCreditDebitCards = createSelector(
  [getCardListState],
  creditCardList =>
    creditCardList &&
    creditCardList.filter(card => card.ccType !== 'GiftCard' && card.ccType !== 'VENMO')
);

export const getGiftCards = createSelector(
  [getCardListState],
  creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'GiftCard')
);

export const getVenmoCards = createSelector(
  [getCardListState],
  creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'VENMO')
);

export const getCardListFetchingState = state => {
  return state.PaymentReducer.get('isFetching');
};

export const getShowNotificationState = state => {
  return state.PaymentReducer.get('showNotification');
};
