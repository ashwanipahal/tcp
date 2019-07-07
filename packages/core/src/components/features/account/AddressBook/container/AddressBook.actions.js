import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';

export const getAddressList = () => ({
  type: ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST,
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
