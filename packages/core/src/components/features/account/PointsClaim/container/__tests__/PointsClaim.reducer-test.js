import { fromJS } from 'immutable';
import PointsClaimReducer from '../PointsClaim.reducer';
import { submitClaimSuccess, submitClaimError, resetState } from '../PointsClaim.actions';

const initialState = fromJS({
  success: null,
  error: null,
});

describe('PointsClaimReducer Reducer', () => {
  it('should return default state', () => {
    const state = PointsClaimReducer(undefined, {});
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBeNull();
  });

  it('should return success state', () => {
    const state = PointsClaimReducer(initialState, submitClaimSuccess('success'));
    expect(state.get('success')).toBe('success');
    expect(state.get('error')).toBeNull();
  });

  it('should return error state', () => {
    const state = PointsClaimReducer(initialState, submitClaimError('error'));
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBe('error');
  });

  it('should reset state', () => {
    const state = PointsClaimReducer(
      fromJS({
        success: 'success message',
        error: null,
      }),
      resetState()
    );
    expect(state.get('success')).toBeNull();
  });
});
