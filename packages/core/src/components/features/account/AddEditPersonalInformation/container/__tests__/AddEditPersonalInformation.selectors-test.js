import { fromJS } from 'immutable';
import { UPDATE_PROFILE_REDUCER_KEY } from '../../../../../../constants/reducer.constants';
import {
  getError,
  getSuccess,
  getPersonalInfoErrorMessage,
} from '../AddEditPersonalInformation.selectors';

describe('#UpdateProfile Selectors', () => {
  let state;
  const errorMsg = 'error message';
  const profileState = {
    [UPDATE_PROFILE_REDUCER_KEY]: fromJS({
      success: 'success message',
      error: errorMsg,
    }),
  };
  beforeEach(() => {
    state = {
      [UPDATE_PROFILE_REDUCER_KEY]: fromJS({
        error: {
          errorParameters: ['error'],
        },
      }),
      Labels: {
        account: {
          profile: {
            lbl_profile_error: 'Error Labels',
          },
        },
      },
    };
  });

  it('#getError should return error state', () => {
    expect(getError(profileState)).toEqual(errorMsg);
  });

  it('#getPersonalInfoErrorResponse should return error state', () => {
    expect(getPersonalInfoErrorMessage(state)).toEqual('Error Labels');
  });

  it('#getSuccess should return success state', () => {
    expect(getSuccess(profileState)).toEqual('success message');
  });
});
