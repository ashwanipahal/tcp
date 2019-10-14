import { fromJS } from 'immutable';
import getRecentSearchesData from '../RecentSearches.selectors';
import { RECENT_SEARCH_REDUCER_KEY } from '../../../../../constants/reducer.constants';

describe('#getAppType selector', () => {
  let storeState;
  beforeEach(() => {
    const initialState = fromJS({
      searchTermList: [],
    });

    const state = initialState.set('searchTermList', [{ text: 'Shoes' }]);
    storeState = {
      [RECENT_SEARCH_REDUCER_KEY]: state,
    };
  });

  it('#getRecentSearchesData should return getRecentSearchesData state', () => {
    expect(getRecentSearchesData(storeState)).toEqual([{ text: 'Shoes' }]);
  });
});
