/**
 * These are temporary changes for a dummy login page
 */
// @flow
import FORGOTPASSWORD_CONSTANTS from '../ForgotPassword.constants';

export const resetPassword = payload => {
  return {
    type: FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD,
    payload,
  };
};

export const resetLoginForgotPasswordState = payload => {
  return {
    type: FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_LOGIN_STATE,
    payload,
  };
};

export const successFullResetEmailState = payload => {
  return {
    type: FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESSFULL_EMAIL,
    payload,
  };
};

export const getResetPasswordSuccess = payload => {
  return {
    type: FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESS,
    payload,
  };
};

export const userNotAvailable = (payload: {}) => {
  return {
    type: FORGOTPASSWORD_CONSTANTS.USER_NOT_AVAILABLE,
    payload,
  };
};

export const getResetPasswordFail = payload => {
  return {
    type: FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_FAIL,
    payload,
  };
};
