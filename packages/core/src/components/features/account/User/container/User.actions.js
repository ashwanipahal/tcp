/**
 * These are temporary changes for a dummy login page
 */

import CONSTANTS from '../User.constants';

export const resetUserInfo = () => {
  return {
    type: CONSTANTS.RESET_USER_INFO,
  };
};

export const clearUserInfo = () => {
  return {
    type: CONSTANTS.CLEAR_USER_INFO_TTL,
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

export const setUserPersonalData = payload => {
  return {
    type: CONSTANTS.SET_USER_PERSONAL_DATA,
    payload,
  };
};
