import { fromJS } from 'immutable';
import ToastMessageReducer from '../Toast.reducer';
import { toastMessageInfo, resetToastMsg } from '../Toast.actions';

const initialState = fromJS({
  toastMessage: null,
});

describe('ChangePassword Reducer', () => {
  it('should return default state', () => {
    const state = ToastMessageReducer(undefined, {});
    expect(state.get('toastMessage')).toBeNull();
  });

  it('should return success state', () => {
    const state = ToastMessageReducer(initialState, toastMessageInfo('success'));
    expect(state.get('toastMessage')).toBe('success');
  });

  it('should return error state', () => {
    const state = ToastMessageReducer(initialState, resetToastMsg('toastMessage'));
    expect(state.get('toastMessage')).toBeNull();
  });
});
