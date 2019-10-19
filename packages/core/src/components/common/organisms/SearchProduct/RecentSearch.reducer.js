import { fromJS } from 'immutable';
import RECENT_SEARCH_CONSTANTS from './RecentSearch.constants';

const INITIAL_STATE = fromJS({
  searchTermList: [],
});

const RecentSearchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECENT_SEARCH_CONSTANTS.SET_RECENT_SEARCH: {
      const { searchTerm } = action.payload;
      const trimmedSearchedTerm = searchTerm.trim();
      if (trimmedSearchedTerm.length === 0) return state;

      let updatedList = [{ text: trimmedSearchedTerm }];

      // retrieve current searches list from state
      let searchTermList = state.get('searchTermList');

      if (
        searchTermList &&
        searchTermList.length > RECENT_SEARCH_CONSTANTS.RECENT_SEARCHES_NUM_MAX
      ) {
        // There can be max 10 terms in local storage at one time, remove first search in such a scenario
        searchTermList.pop();
      }

      // remove duplicates
      searchTermList = searchTermList.filter(item => item.text !== trimmedSearchedTerm);

      if (searchTermList && searchTermList.length > 0) {
        // Add recent term to top of list
        updatedList = [...updatedList, ...searchTermList];
      }

      return state.set('searchTermList', updatedList);
    }
    default:
      return state;
  }
};

export default RecentSearchReducer;
