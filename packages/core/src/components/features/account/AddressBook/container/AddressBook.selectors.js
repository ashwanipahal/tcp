export const getAddressListState = state => {
  return state.AddressBookReducer.get('list');
};

export const getAddressListFetchingState = state => {
  return state.AddressBookReducer.get('isFetching');
};

export const showDefaultShippingUpdatedState = state => {
  return state.AddressBookReducer.get('showDefaultShippingUpdatedMsg');
};
