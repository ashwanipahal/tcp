/**
 * These are temporary changes for a dummy login page
 */

const LOGINPAGE_CONSTANTS = {
  LOGIN: 'LOGIN',
  SET_LOGIN_INFO: 'SET_LOGIN_INFO',
  GET_USER_INFO: 'GET_USER_INFO',
  RESET_LOGIN_INFO: 'RESET_LOGIN_INFO',
  CLEAR_USER_INFO_TTL: 'CLEAR_USER_INFO_TTL',
  FAILED_ATTEMPT_ALLOWED: 2,
  PAGE_TYPE: {
    LOGIN: 'login',
    FORGOT_PASSWORD: 'forgotPassword',
    RESET_PASSWORD: 'resetPassword',
  },
  GET_USER_INFO_TTL: 30 * 60 * 60 * 1000
};

export default LOGINPAGE_CONSTANTS;
