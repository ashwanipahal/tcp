import constants from '../MyProfile.constants';

export const updateProfileSuccess = payload => ({
  type: constants.UPDATE_PROFILE_SUCCESS,
  payload,
});

export default updateProfileSuccess;
