import SEARCH_CONSTANTS from './SearchBar.constants';

const initialState = {};

const SearchBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CONSTANTS.SET_SEARCH:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export default SearchBarReducer;
