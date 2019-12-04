export const isSearched = () => {
  return true;
};

export const getLatestSearchResultsExists = latestSearchResults => {
  return !!(latestSearchResults && latestSearchResults.length > 0);
};
