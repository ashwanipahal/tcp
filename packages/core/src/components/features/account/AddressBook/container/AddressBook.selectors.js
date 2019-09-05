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

export const getAddEditAddressLabels = state => {
  const {
    ACC_LBL_ADD_ADDRESS_FORM_HEADING: addNewAddress,
    ACC_LBL_EDIT_ADDRESS_FORM_HEADING: editAddressLbl,
    ACC_LBL_VERIFY_YOUR_ADDRESS_HEADER: verifyAddress,
    ACC_LBL_EDIT_ADDRESS: editAddress,
  } = state.Labels.account && state.Labels.account.addressBook;
  return {
    editAddressLbl,
    addNewAddress,
    verifyAddress,
    editAddress,
  };
};
