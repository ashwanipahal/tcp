import { createSelector } from 'reselect';

export const getCardListState = state => {
  return state.PaymentReducer.get('cardList');
};

export const getCreditDebitCards = createSelector(
  [getCardListState],
  creditCardList =>
    creditCardList &&
    creditCardList.filter(card => card.ccType !== 'GiftCard' && card.ccType !== 'VenmoCard')
);

export const getGiftCards = createSelector(
  [getCardListState],
  creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'GiftCard')
);

export const getVenmoCards = createSelector(
  [getCardListState],
  creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'VenmoCard')
);

export const getCardListFetchingState = state => {
  return state.PaymentReducer.get('isFetching');
};

export const getShowNotificationState = state => {
  return state.PaymentReducer.get('showNotification');
};

export const deleteModalOpenState = state => {
  return state.PaymentReducer.get('deleteModalMountedState');
};

export const showUpdatedNotificationOnModalState = state => {
  return state.PaymentReducer.get('showUpdatedNotificationOnModal');
};

export const checkbalanceValue = state => {
  return state.PaymentReducer.get('giftcardBalance');
};
