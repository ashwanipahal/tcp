import constants from '../AddEditPersonalInformation.constants';

export const updateProfile = payload => ({
  type: constants.UPDATE_PROFILE,
  payload,
});

export const updateProfileSuccess = payload => ({
  type: constants.UPDATE_PROFILE_SUCCESS,
  payload,
});

export const updateProfileError = payload => ({
  type: constants.UPDATE_PROFILE_ERROR,
  payload,
});
