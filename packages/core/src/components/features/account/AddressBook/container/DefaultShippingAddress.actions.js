// @flow
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';

export const setDefaultShippingAddressRequest = (payload: {}) => {
  return {
    type: ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
    payload,
  };
};

export const setDefaultShippingAddressSuccess = (body: {}) => {
  return {
    type: ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
    body,
  };
};

export const setDefaultShippingAddressFailure = (error: {}) => {
  return {
    type: ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED,
    error,
  };
};
