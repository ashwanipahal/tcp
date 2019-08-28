import { fromJS } from 'immutable';
import UpdateProfileReducer from '../AddEditPersonalInformation.reducer';
import { updateProfileSuccess, updateProfileError } from '../AddEditPersonalInformation.actions';

const initialState = fromJS({
  success: null,
  error: null,
});

describe('ChangePassword Reducer', () => {
  it('should return default state', () => {
    const state = UpdateProfileReducer(undefined, {});
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBeNull();
  });

  it('should return success state', () => {
    const state = UpdateProfileReducer(initialState, updateProfileSuccess('success'));
    expect(state.get('success')).toBe('success');
    expect(state.get('error')).toBeNull();
  });

  it('should return error state', () => {
    const state = UpdateProfileReducer(initialState, updateProfileError('error'));
    expect(state.set('success')).toBeNull();
    expect(state.get('error')).toBe('error');
  });
});
