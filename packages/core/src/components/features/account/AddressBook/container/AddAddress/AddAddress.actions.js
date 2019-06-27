import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';

export const addAddressReq = payload => {
  return {
    type: ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_REQ,
    payload,
  };
};

export const addAddressSuccess = payload => {
  return {
    type: ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_SUCCESS,
    payload,
  };
};
export const addAddressFail = payload => {
  return {
    type: ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL,
    payload,
  };
};
