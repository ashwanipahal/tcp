/**
 * These are temporary changes for a dummy login page
 */

import { LOGINPAGE_CONSTANTS } from '../LoginPage.constants';

export const login = payload => {
  return {
    type: LOGINPAGE_CONSTANTS.LOGIN,
    payload,
  };
};

export const setLoginInfo = payload => {
  return {
    type: LOGINPAGE_CONSTANTS.SET_LOGIN_INFO,
    payload,
  };
};

export const getUserInfo = () => {
  return {
    type: LOGINPAGE_CONSTANTS.GET_USER_INFO,
  };
};
