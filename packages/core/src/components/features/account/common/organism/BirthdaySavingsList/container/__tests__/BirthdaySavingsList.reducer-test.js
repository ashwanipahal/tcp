import { fromJS } from 'immutable';
import BirthdaySavingsListReducer from '../BirthdaySavingsList.reducer';
import {
  getChildrenAction,
  updateBirthdaySavingSuccess,
  updateBirthdaySavingError,
  resetBirthdaySavingMessageAction,
} from '../BirthdaySavingsList.actions';

const initialState = fromJS({
  success: null,
  error: null,
});

describe('BirthdaySavingsListReducer', () => {
  it('should return default state', () => {
    const state = BirthdaySavingsListReducer(undefined, {});
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBeNull();
  });

  it('should return success state', () => {
    const state = BirthdaySavingsListReducer(initialState, updateBirthdaySavingSuccess('success'));
    expect(state.get('success')).toBe('success');
    expect(state.get('error')).toBeNull();
  });

  it('should return error state', () => {
    const state = BirthdaySavingsListReducer(initialState, updateBirthdaySavingError('error'));
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBe('error');
  });

  it('should reset state on resetBirthdaySavingMessageAction', () => {
    const state = BirthdaySavingsListReducer(
      fromJS({
        success: 'success message',
        error: null,
      }),
      resetBirthdaySavingMessageAction()
    );
    expect(state.get('success')).toBeNull();
  });

  it('should reset state on getChildrenAction', () => {
    const state = BirthdaySavingsListReducer(
      fromJS({
        success: 'success message',
        error: null,
      }),
      getChildrenAction()
    );
    expect(state.get('success')).toBeNull();
  });
});
