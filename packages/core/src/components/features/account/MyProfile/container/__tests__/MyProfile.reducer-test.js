import { fromJS } from 'immutable';
import MyProfileReducer from '../MyProfile.reducer';
import { updateProfileSuccess } from '../MyProfile.actions';

const initialState = fromJS({
  success: null,
  error: null,
});

describe('MyProfile Reducer', () => {
  it('should return default state', () => {
    const state = MyProfileReducer(undefined, {});
    expect(state.get('success')).toBeNull();
  });

  it('should return success state', () => {
    const state = MyProfileReducer(initialState, updateProfileSuccess('success'));
    expect(state.get('success')).toBe('success');
  });
});
