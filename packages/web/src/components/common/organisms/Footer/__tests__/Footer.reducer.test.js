import { fromJS } from 'immutable';
import FooterReducer from '../container/Footer.reducer';

describe('Footer Reducer', () => {
  let state = '';
  beforeEach(() => {
    state = fromJS({});
  });
  test('should return intial state', () => {
    state = FooterReducer(undefined, { type: 'DEFAULT_STATE' });
    expect(state).toBeDefined();
  });
});
