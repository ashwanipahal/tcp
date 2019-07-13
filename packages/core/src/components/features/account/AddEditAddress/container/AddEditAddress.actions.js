// @flow
import constants from './AddEditAddress.constants';

export const addAddressReq = (payload: {}) => {
  return {
    type: constants.ADD_USER_ADDRESS_REQ,
    payload,
  };
};

export const addAddressSuccess = (payload: {}) => {
  return {
    type: constants.ADD_USER_ADDRESS_SUCCESS,
    payload,
  };
};
export const addAddressFail = (payload: {}) => {
  return {
    type: constants.ADD_USER_ADDRESS_FAIL,
    payload,
  };
};

export const updateAddressReq = (payload: {}) => {
  return {
    type: constants.UPDATE_USER_ADDRESS_REQ,
    payload,
  };
};
