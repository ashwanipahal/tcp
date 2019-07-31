export const getAccountNavigationState = state => {
  return state.AccountReducer.get('accountNavigation');
};

export const getAccountNavigationFetchingState = state => {
  return state.AccountReducer.get('isFetching');
};
