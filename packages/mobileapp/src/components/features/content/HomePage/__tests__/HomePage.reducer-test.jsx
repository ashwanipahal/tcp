import HomepageReducer from '../container/HomePage.reducer';
// import { getAccountNavigationList } from '../container/Account.actions';
import { HOMEPAGE_CONSTANTS } from '../HomePage.constants';

// et accountNavigationList = [{}];

describe('Home Page reducer', () => {
  it('should return the initial state', () => {
    expect(HomepageReducer(undefined, {})).toEqual({
      links: [],
      eSpots: [],
    });
  });

  it('should return links if state is passed as an array', () => {
    const mock = { links: ['abc', 'def'] };
    const action = {
      type: HOMEPAGE_CONSTANTS.SET_HEADER_LINKS,
      payload: mock.links,
    };
    expect(HomepageReducer({}, action)).toEqual(mock);
  });
  it('should return eSpots if state is passed as an array', () => {
    const mock = { eSpots: ['abc', 'def'] };
    const action = {
      type: HOMEPAGE_CONSTANTS.SET_ESPOST,
      payload: mock.eSpots,
    };
    expect(HomepageReducer({}, action)).toEqual(mock);
  });
});
