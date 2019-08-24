import constants from '../AddEditPersonalInformation.constants';

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
