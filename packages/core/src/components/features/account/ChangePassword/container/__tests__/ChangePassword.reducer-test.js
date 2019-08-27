import { fromJS } from 'immutable';
import ChangePasswordReducer from '../ChangePassword.reducer';
import { changePasswordSuccess, changePasswordError } from '../ChangePassword.actions';

const initialState = fromJS({
  success: null,
  error: null,
});

describe('ChangePassword Reducer', () => {
  it('should return default state', () => {
    const state = ChangePasswordReducer(undefined, {});
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBeNull();
  });

  it('should return success state', () => {
    const state = ChangePasswordReducer(initialState, changePasswordSuccess('success'));
    expect(state.get('success')).toBe('success');
    expect(state.get('error')).toBeNull();
  });

  it('should return error state', () => {
    const state = ChangePasswordReducer(initialState, changePasswordError('error'));
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBe('error');
  });
});
