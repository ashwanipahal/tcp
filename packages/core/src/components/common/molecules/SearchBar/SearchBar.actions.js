import HEADER_MIDDLE_CONSTANTS from './SearchBar.constants';

export const getSearchResult = payload => {
  return { type: HEADER_MIDDLE_CONSTANTS.START_SEARCH, payload };
};

export const setSearchResult = payload => {
  return { type: HEADER_MIDDLE_CONSTANTS.SET_SEARCH, payload };
};

export const setShowMoreProductFlag = payload => {
  return { type: HEADER_MIDDLE_CONSTANTS.SET_SHOW_MORE_PRODUCT_FLAG, payload };
};
