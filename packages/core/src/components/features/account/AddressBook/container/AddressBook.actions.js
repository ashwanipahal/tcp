import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';

export const getAddressList = payload => ({
  type: ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST,
  payload,
});

export const setAddressList = addressList => ({
  type: ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST,
  addressList,
});

export const loadAddAddressComponent = () => ({
  type: ADDRESS_BOOK_CONSTANTS.LOAD_ADD_ADDRESS_COMPONENT,
});

export const loadAddressBookComponent = () => ({
  type: ADDRESS_BOOK_CONSTANTS.LOAD_ADDRESSBOOK_COMPONENT,
});

export const setEditAddress = payload => {
  return {
    type: ADDRESS_BOOK_CONSTANTS.SET_EDIT_ADDRESS_ITEM,
    payload,
  };
};
export const updateAddressListOnDelete = payload => ({
  type: ADDRESS_BOOK_CONSTANTS.UPDATE_ADDRESS_LIST_ON_DELETE,
  payload,
});

export const updateAddressListOnDeleteErr = payload => ({
  type: ADDRESS_BOOK_CONSTANTS.UPDATE_ADDRESS_LIST_ON_DELETE_ERR,
  payload,
});

export const deleteAddress = payload => ({
  type: ADDRESS_BOOK_CONSTANTS.DELETE_ADDRESS,
  payload,
});

export const setDeleteModalMountedState = payload => ({
  type: ADDRESS_BOOK_CONSTANTS.DELETE_MODAL_MOUNTED_STATE,
  payload,
});

export const clearGetAddressListTTL = () => ({
  type: ADDRESS_BOOK_CONSTANTS.CLEAR_GET_ADDRESS_LIST_TTL,
});

export const showLoader = () => ({
  type: ADDRESS_BOOK_CONSTANTS.SHOW_LOADER,
});

export const setAddressBookNotification = payload => ({
  type: ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_BOOK_NOTIFICATION,
  payload,
});
