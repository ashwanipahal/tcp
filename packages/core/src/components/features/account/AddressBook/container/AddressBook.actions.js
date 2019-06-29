import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';

export const getAddressList = () => ({
  type: ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST,
});

export const setAddressList = addressList => ({
  type: ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST,
  addressList,
});

export const loadAddAddressComponent = ({state}) => ({
  type: ADDRESS_BOOK_CONSTANTS.LOAD_ADD_ADDRESS_COMPONENT,
  state,
});
