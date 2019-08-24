import { fromJS } from 'immutable';
import { CHANGE_PASSWORD_REDUCER_KEY } from '../../../../../../constants/reducer.constants';
import { getError, getSuccess } from '../AddEditPersonalInformation.selectors';

describe('#ChangePassword Selectors', () => {
  let state;
  beforeEach(() => {
    const changePasswordState = fromJS({
      success: 'success message',
      error: 'error message',
    });
    state = {
      [CHANGE_PASSWORD_REDUCER_KEY]: changePasswordState,
    };
  });

  it('#getError should return error state', () => {
    expect(getError(state)).toEqual('error message');
  });

  it('#getSuccess should return success state', () => {
    expect(getSuccess(state)).toEqual('success message');
  });
});
