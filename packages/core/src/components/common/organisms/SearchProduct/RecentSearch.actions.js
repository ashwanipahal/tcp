import RECENT_SEARCH_CONSTANTS from './RecentSearch.constants';

const setRecentSearch = payload => ({
  type: RECENT_SEARCH_CONSTANTS.SET_RECENT_SEARCH,
  payload,
});

const setRecentSearchData = payload => ({
  type: RECENT_SEARCH_CONSTANTS.SET_RECENT_SEARCH_DATA,
  payload,
});

export { setRecentSearchData, setRecentSearch };
