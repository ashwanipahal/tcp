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

export default {
  getRecentStoreFromLocalStorage,
  setRecentStoreToLocalStorage,
};
