import { FETCH_USER_ADDRESSES, SET_USER_ADDRESSES } from '../AddressBook.contants';

export const getUserAddresses = () => {
  return {
    type: FETCH_USER_ADDRESSES,
  };
};

export const setUserAddresses = payload => {
  return {
    type: SET_USER_ADDRESSES,
    payload,
  };
};
