import MY_PROFILE_CONSTANTS from '../../MyProfile.constants';
import { updateProfileSuccess } from '../MyProfile.actions';

describe('My Profile actions', () => {
  it('updateProfileSuccess should return action type as UPDATE_PROFILE_SUCCESS', () => {
    expect(updateProfileSuccess().type).toBe(MY_PROFILE_CONSTANTS.UPDATE_PROFILE_SUCCESS);
  });
});
