/**
 * These are temporary changes for a dummy login page
 */

import CONSTANTS from '../User.constants';

export const resetUserInfo = () => {
  return {
    type: CONSTANTS.RESET_USER_INFO,
  };
};

export const getUserInfo = () => {
  return {
    type: CONSTANTS.GET_USER_INFO,
  };
};

export const setUserInfo = payload => {
  return {
    type: CONSTANTS.SET_USER_INFO,
    payload,
  };
};
