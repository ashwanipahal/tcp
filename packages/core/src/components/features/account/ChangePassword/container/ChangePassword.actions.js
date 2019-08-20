import constants from '../ChangePassword.constants';

export const changePassword = payload => ({
  type: constants.CHANGE_PASSWORD,
  payload,
});

export const changePasswordSuccess = payload => ({
  type: constants.CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const changePasswordError = payload => ({
  type: constants.CHANGE_PASSWORD_ERROR,
  payload,
});

export const changeState = () => ({
  type: constants.CHANGE_STATE,
});
