export const getAddressListState = state => {
  return state.AddressBookReducer.get('list');
};

export const getAddressListFetchingState = state => {
  return state.AddressBookReducer.get('isFetching');
};

export const showUpdatedNotificationState = state => {
  return state.AddressBookReducer.get('showUpdatedNotification');
};

export const showUpdatedNotificationOnModalState = state => {
  return state.AddressBookReducer.get('showUpdatedNotificationOnModal');
};

export const deleteModalOpenState = state => {
  return state.AddressBookReducer.get('deleteModalMountedState');
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
