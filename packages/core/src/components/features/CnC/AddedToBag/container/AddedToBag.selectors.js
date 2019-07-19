// import { createSelector } from 'reselect';

export const getAddedToBagData = state => {
  return state.AddedToBagReducer.get('itemInfo');
};

export const isOpenAddedToBag = state => {
  return state.AddedToBagReducer.get('isOpenAddedToBag');
};

// export const getCreditDebitCards = createSelector(
//   [getCardListState],
//   creditCardList =>
//     creditCardList &&
//     creditCardList.filter(card => card.ccType !== 'GiftCard' && card.ccType !== 'VenmoCard')
// );

// export const getGiftCards = createSelector(
//   [getCardListState],
//   creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'GiftCard')
// );

// export const getVenmoCards = createSelector(
//   [getCardListState],
//   creditCardList => creditCardList && creditCardList.filter(card => card.ccType === 'VenmoCard')
// );

// export const getCardListFetchingState = state => {
//   return state.PaymentReducer.get('isFetching');
// };

// export const getShowNotificationState = state => {
//   return state.PaymentReducer.get('showNotification');
// };
