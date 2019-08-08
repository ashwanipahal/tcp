import constants from '../ResetPassword.constants';

export const resetPassword = payload => ({
  type: constants.RESET_PASSWORD,
  payload,
});

export const resetPasswordSuccess = payload => ({
  type: constants.RESET_PASSWORD_SUCCESS,
  payload,
});

export const resetPasswordError = payload => ({
  type: constants.RESET_PASSWORD_ERROR,
  payload,
});

export const resetState = () => ({
  type: constants.RESET_STATE,
});
