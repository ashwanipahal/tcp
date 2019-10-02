import { fromJS } from 'immutable';
import { CHANGE_PASSWORD_REDUCER_KEY } from '../../../../../../constants/reducer.constants';
import { getError, getSuccess, getChangeErrorResponse } from '../ChangePassword.selectors';

describe('#ChangePassword Selectors', () => {
  let state;
  const erroMsg = 'error message';
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
    expect(getError(state)).toEqual(erroMsg);
  });

  it('#getSuccess should return success state', () => {
    expect(getSuccess(state)).toEqual('success message');
  });

  it('#getChangeErrorResponse should return error state', () => {
    expect(getChangeErrorResponse(state)).toEqual(erroMsg);
  });
});
