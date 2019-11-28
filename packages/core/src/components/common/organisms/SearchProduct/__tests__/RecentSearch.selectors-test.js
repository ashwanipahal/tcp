import getRecentSearchesData from '../RecentSearches.selectors';
import { RECENT_SEARCH_REDUCER_KEY } from '../../../../../constants/reducer.constants';

describe('#getAppType selector', () => {
  let storeState;
  beforeEach(() => {
    const initialState = {
      searchTermList: [],
    };

    const state = { ...initialState, searchTermList: [{ text: 'Shoes' }] };
    storeState = {
      [RECENT_SEARCH_REDUCER_KEY]: state,
    };
  });

  it('#getRecentSearchesData should return getRecentSearchesData state', () => {
    expect(getRecentSearchesData(storeState)).toEqual([{ text: 'Shoes' }]);
  });
});
