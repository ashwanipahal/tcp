import { fromJS } from 'immutable';
import HOMEPAGE_CONSTANTS from '../HomePage.constants';
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
  test('should set Header links data', () => {
    const action = {
      type: HOMEPAGE_CONSTANTS.SET_HEADER_LINKS,
      data: 'Header Link data',
    };
    const newState = state.set('data', fromJS(action));
    expect(newState.get('data')).toEqual(fromJS(action));
  });
  test('should set espot data', () => {
    const action = {
      type: HOMEPAGE_CONSTANTS.SET_ESPOST,
      data: 'Espot data',
    };
    const newState = state.set('data', fromJS(action));
    expect(newState.get('data')).toEqual(fromJS(action));
  });
});
