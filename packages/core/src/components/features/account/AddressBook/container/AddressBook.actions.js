// @flow
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

export const loadAddressBookComponent = state => ({
  type: ADDRESS_BOOK_CONSTANTS.LOAD_ADDRESSBOOK_COMPONENT,
  state,
});

export const setEditAddress = (payload: {}) => {
  return {
    type: ADDRESS_BOOK_CONSTANTS.SET_EDIT_ADDRESS_ITEM,
    payload,
  };
};
