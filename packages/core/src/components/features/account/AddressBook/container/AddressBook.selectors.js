export const getAddressListState = state => {
  return state.AddressBookReducer.get('list');
};

export const getAddressListFetchingState = state => {
  return state.AddressBookReducer.get('isFetching');
};

export const showDefaultShippingUpdatedState = state => {
  console.log(state.AddressBookReducer.get('showDefaultShippingUpdatedState') + state)
  return state.AddressBookReducer.get('showDefaultShippingUpdatedMsg');
};

export const showAddAddressComponent = state => {
  console.log(state.AddressBookReducer.get('addAddressLoaded') + state)
  return state.AddressBookReducer.get('addAddressLoaded');
};