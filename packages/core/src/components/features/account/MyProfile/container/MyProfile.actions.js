import constants from '../MyProfile.constants';

export const myProfileSuccess = payload => ({
  type: constants.MY_PROFILE_SUCCESS,
  payload,
});

export const myProfileError = payload => ({
  type: constants.MY_PROFILE_ERROR,
  payload,
});
