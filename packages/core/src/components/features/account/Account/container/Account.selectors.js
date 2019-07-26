export const getAccountNavigationState = state => {
  return state.AccountReducer.get('accountNavigation');
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
