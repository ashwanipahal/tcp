export const getAddressListState = state => {
  return state.AddressBookReducer.get('list');
};

export const getAddressListFetchingState = state => {
  return state.AddressBookReducer.get('isFetching');
};

export const showDefaultShippingUpdatedState = state => {
  return state.AddressBookReducer.get('showDefaultShippingUpdatedMsg');
};

export const showAddAddressComponent = state => {
  return state.AddressBookReducer.get('addAddressLoaded');
};

export const getEditAddressItem = state => {
  return state.AddressBookReducer.get('editAddressItem');
};

export const getEditAddressActive = state => {
  return state.AddressBookReducer.get('isEditingAddress');
};
