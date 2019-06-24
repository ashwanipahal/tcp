import { fromJS } from 'immutable';
import HomePageReducer from '../container/HomePage.reducer';

describe('HomePage Reducer', () => {
  let state = '';
  beforeEach(() => {
    state = fromJS({});
  });
  const INITIAL_STATE = {
    links: [],
    eSpots: [],
  };

  test('should return intial state', () => {
    state = HomePageReducer(INITIAL_STATE, { type: 'DEFAULT_STATE' });
    expect(state).toBeDefined();
  });
});
