export const getAddressListState = state => {
  return state.AddressBookReducer.get('list');
};

export const getFetchingState = state => {
  return state.AddressBookReducer.get('isFetching');
};
