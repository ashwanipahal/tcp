// @flow
import EDIT_ADDRESS_CONSTANTS from './EditAddress.constants';

export const editAddressReq = (payload: {}) => {
  return {
    type: EDIT_ADDRESS_CONSTANTS.EDIT_USER_ADDRESS_REQ,
    payload,
  };
};
