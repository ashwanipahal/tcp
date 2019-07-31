export const getLabels = state => {
  return state.Labels.account;
};

export const getAccountNavigationState = state => {
  return state.AccountReducer.get('accountNavigation');
};

export const getAccountNavigationFetchingState = state => {
  return state.AccountReducer.get('isFetching');
};
