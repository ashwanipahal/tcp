import { setLocalStorage, getLocalStorage } from '../../../../../../utils/localStorageManagement';
import constants from '../StoreLanding.constants';

export const setFavStoreToLocalStorage = store => {
  const params = {
    key: constants.FAV_STORE_CACHE_KEY,
    value: JSON.stringify(store),
  };
  setLocalStorage(params);
};

export const getFavStoreFromLocalStorage = () => getLocalStorage(constants.FAV_STORE_CACHE_KEY);

export default {
  getFavStoreFromLocalStorage,
  setFavStoreToLocalStorage,
};
