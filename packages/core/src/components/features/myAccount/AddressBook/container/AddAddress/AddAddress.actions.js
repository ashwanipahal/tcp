import {
  ADD_USER_ADDRESS_REQ,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_FAIL,
} from './AddressBook.contants';

export const addAddressReq = payload => {
  return {
    type: ADD_USER_ADDRESS_REQ,
    payload,
  };
};

export const addAddressSuccess = payload => {
  return {
    type: ADD_USER_ADDRESS_SUCCESS,
    payload,
  };
};
export const addAddressFail = payload => {
  return {
    type: ADD_USER_ADDRESS_FAIL,
    payload,
  };
};
