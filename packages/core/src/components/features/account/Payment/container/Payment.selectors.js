export const getCardListState = state => {
  return state.PaymentReducer.get('cardList');
};

export const getCardListFetchingState = state => {
  return state.PaymentReducer.get('isFetching');
};

export const getShowNotificationState = state => {
  return state.PaymentReducer.get('showNotification');
};
