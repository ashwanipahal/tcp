import { fromJS } from 'immutable';
import HEADER_CONSTANTS from '@tcp/core/src/components/features/content/Header/container/Header.constants';
import HeaderReducer from '@tcp/core/src/components/features/content/Header/container/Header.reducer';

describe('Header Reducer', () => {
  let state = '';
  beforeEach(() => {
    state = fromJS({});
  });
  test('should return intial state', () => {
    state = HeaderReducer(undefined, { type: 'DEFAULT_STATE' });
    expect(state).toBeDefined();
  });
  test('should load Header data', () => {
    const action = {
      type: HEADER_CONSTANTS.LOAD_HEADER_DATA,
      data: 'Header data',
    };
    const newState = state.set('data', fromJS(action));
    expect(newState.get('data')).toEqual(fromJS(action));
  });
});
