import { fromJS } from 'immutable';
import { MY_PROFILE_REDUCER_KEY } from '../../../../../../constants/reducer.constants';
import { getSuccess } from '../MyProfile.selectors';

describe('#My Profile Selectors', () => {
  let state;
  beforeEach(() => {
    const myProfileState = fromJS({
      success: 'success message',
    });
    state = {
      [MY_PROFILE_REDUCER_KEY]: myProfileState,
    };
  });

  it('#getSuccess should return success state', () => {
    expect(getSuccess(state)).toEqual('success message');
  });
});
