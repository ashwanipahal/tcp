/**
 * These are temporary changes for a dummy login page
 */

import LOGINPAGE_CONSTANTS from '../LoginPage.constants';

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

export const setLoginError = payload => {
  return {
    type: LOGINPAGE_CONSTANTS.SET_LOGIN_ERROR,
    payload,
  };
};

export const getUserInfo = () => {
  return {
    type: LOGINPAGE_CONSTANTS.GET_USER_INFO,
  };
};

export const getUserInfoPOC = () => {
  return {
    type: 'GET_USER_DETAIL_POC',
  };
};

export const getOrderDetail = () => {
  return {
    type: 'GET_ORDER_DETAIL',
  };
};
