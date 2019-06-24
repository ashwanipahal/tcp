import { fromJS } from 'immutable';
import HeaderReducer from '../container/Header.reducer';

describe('Header Reducer', () => {
  let state = '';
  beforeEach(() => {
    state = fromJS({});
  });
  test('should return intial state', () => {
    state = HeaderReducer(undefined, { type: 'DEFAULT_STATE' });
    expect(state).toBeDefined();
  });
});
