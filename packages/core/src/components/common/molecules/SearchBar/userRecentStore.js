import { setLocalStorage, getLocalStorage } from '../../../../utils/localStorageManagement';
import constants from './SearchBar.constants';

export const setRecentStoreToLocalStorage = store => {
  const params = {
    key: constants.RECENT_STORE_CACHE_KEY,
    value: JSON.stringify(store),
  };
  setLocalStorage(params);
};

export const getRecentStoreFromLocalStorage = () =>
  getLocalStorage(constants.RECENT_STORE_CACHE_KEY);

export const updateLocalStorageData = (searchText, url) => {
  if (searchText) {
    const searchTextParam = searchText.trim().toLowerCase();
    const searchTermWithUrl = url ? `${searchTextParam}<url>${url}` : searchTextParam;

    const getPreviousSearchResults = getRecentStoreFromLocalStorage() || JSON.stringify([]);
    const recentSearchResults = JSON.parse(getPreviousSearchResults.toLowerCase().split(','));

    const existingIndex = recentSearchResults.indexOf(searchTermWithUrl);
    if (existingIndex >= 0) {
      recentSearchResults.splice(existingIndex, 1);
    }

    recentSearchResults.push(searchTermWithUrl);

    if (recentSearchResults && recentSearchResults.length > constants.RECENT_SEARCHES_NUM_MAX) {
      recentSearchResults.shift();
    }

    setRecentStoreToLocalStorage(recentSearchResults);
  }
};

export default {
  getRecentStoreFromLocalStorage,
  setRecentStoreToLocalStorage,
  updateLocalStorageData,
};
