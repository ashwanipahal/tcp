import { createSelector } from 'reselect';
import { RECENT_SEARCH_REDUCER_KEY } from '../../../../constants/reducer.constants';

const getRecentSearchesState = state => {
  return state[RECENT_SEARCH_REDUCER_KEY];
};

const getRecentSearchesData = createSelector(
  getRecentSearchesState,
  recentSearches => recentSearches && recentSearches.get('searchTermList')
);

export default getRecentSearchesData;
