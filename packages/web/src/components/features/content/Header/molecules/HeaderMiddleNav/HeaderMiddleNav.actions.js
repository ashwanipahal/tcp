import HEADER_MIDDLE_CONSTANTS from './HeaderMiddleNav.constants';

export const getSearchResult = payload => {
  return { type: HEADER_MIDDLE_CONSTANTS.START_SEARCH, payload };
};

export const setSearchResult = payload => {
  return { type: HEADER_MIDDLE_CONSTANTS.SET_SEARCH, payload };
};
