import { fromJS } from 'immutable';
import ToastMessageReducer from '../Toast.reducer.native';
import { toastMessageInfo, resetToastMsg, toastMessagePosition } from '../Toast.actions.native';

const initialState = fromJS({
  toastMessage: null,
});

describe('Toast Reducer', () => {
  it('should return default state', () => {
    const state = ToastMessageReducer(undefined, {});
    expect(state.get('toastMessage')).toBeNull();
  });

  it('should return success state', () => {
    const state = ToastMessageReducer(initialState, toastMessageInfo('success'));
    expect(state.get('toastMessage')).toBe('success');
  });

  it('should return error state', () => {
    const state = ToastMessageReducer(initialState, resetToastMsg());
    expect(state.get('toastMessage')).toBeNull();
  });
  it('should return error state', () => {
    const state = ToastMessageReducer(initialState, toastMessagePosition(10));
    expect(state.get('toastMessagePosition')).toBe(10);
  });
});
