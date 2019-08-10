import { fromJS } from 'immutable';
import ResetPasswordReducer from '../ResetPassword.reducer';
import { resetPasswordSuccess, resetPasswordError, resetState } from '../ResetPassword.actions';

const initialState = fromJS({
  success: null,
  error: null,
});

describe('ResetPassword Reducer', () => {
  it('should return default state', () => {
    const state = ResetPasswordReducer(undefined, {});
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBeNull();
  });

  it('should return success state', () => {
    const state = ResetPasswordReducer(initialState, resetPasswordSuccess('success'));
    expect(state.get('success')).toBe('success');
    expect(state.get('error')).toBeNull();
  });

  it('should return error state', () => {
    const state = ResetPasswordReducer(initialState, resetPasswordError('error'));
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBe('error');
  });

  it('should reset state', () => {
    const state = ResetPasswordReducer(
      fromJS({
        success: 'success message',
        error: null,
      }),
      resetState()
    );
    expect(state.get('success')).toBeNull();
  });
});
