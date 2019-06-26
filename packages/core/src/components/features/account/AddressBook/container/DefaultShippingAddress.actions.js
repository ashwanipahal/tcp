// @flow
import SHIPPING_ADDRESS_CONSTANTS from '../DefaultShippingAddress.constants';

export const setDefaultShippingAddressRequest = (payload: {}) => {
  return {
    type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
    payload,
  };
};

export const setDefaultShippingAddressSuccess = (body: {}) => {
  return {
    type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
    body,
  };
};

export const setDefaultShippingAddressFailure = (error: {}) => {
  return {
    type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED,
    error,
  };
};
