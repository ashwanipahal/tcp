import {
  FETCH_USER_ADDRESSES,
  SET_USER_ADDRESSES,
  ADD_USER_ADDRESS_REQ,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_FAIL,
} from '../AddressBook.contants';

export const getUserAddresses = payload => {
  return {
    type: FETCH_USER_ADDRESSES,
    payload,
  };
};

export const setUserAddresses = payload => {
  return {
    type: SET_USER_ADDRESSES,
    payload,
  };
};

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
