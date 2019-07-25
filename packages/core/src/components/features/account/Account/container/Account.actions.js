// @flow
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';

export const getAccountNavigationList = () => ({
  type: ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST,
});

export const setAddressList = addressList => ({
  type: ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST,
  addressList,
});

export const showLoader = () => ({
  type: ADDRESS_BOOK_CONSTANTS.SHOW_LOADER,
});
