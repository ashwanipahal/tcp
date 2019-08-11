import { fromJS } from 'immutable';
import { RESET_PASSWORD_REDUCER_KEY } from '../../../../../../constants/reducer.constants';
import { getError, getSuccess } from '../ResetPassword.selectors';

describe('#ResetPassword Selectors', () => {
  let state;
  beforeEach(() => {
    const resetPasswordState = fromJS({
      success: 'success message',
      error: 'error message',
    });
    state = {
      [RESET_PASSWORD_REDUCER_KEY]: resetPasswordState,
    };
  });

  it('#getError should return error state', () => {
    expect(getError(state)).toEqual('error message');
  });

  it('#getSuccess should return success state', () => {
    expect(getSuccess(state)).toEqual('success message');
  });
});
