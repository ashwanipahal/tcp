import { fromJS } from 'immutable';
import { UPDATE_PROFILE_REDUCER_KEY } from '../../../../../../constants/reducer.constants';
import { getError, getSuccess } from '../AddEditPersonalInformation.selectors';

describe('#UpdateProfile Selectors', () => {
  let state;
  beforeEach(() => {
    const updateProfileState = fromJS({
      success: 'success message',
      error: 'error message',
    });
    state = {
      [UPDATE_PROFILE_REDUCER_KEY]: updateProfileState,
    };
  });

  it('#getError should return error state', () => {
    expect(getError(state)).toEqual('error message');
  });

  it('#getSuccess should return success state', () => {
    expect(getSuccess(state)).toEqual('success message');
  });
});
