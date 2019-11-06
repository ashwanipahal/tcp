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
export const setLoadingState = payload => {
  return {
    payload,
    type: constants.SET_LOADING_STATE,
  };
};
export const resetState = () => {
  return {
    type: constants.RESET_ADDRESS_STATE,
  };
};

export const updateAddressReq = (payload: {}) => {
  return {
    type: constants.UPDATE_USER_ADDRESS_REQ,
    payload,
  };
};
