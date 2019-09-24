import {
  STORE_LOCATOR_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
  USER_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';

export const getCurrentCountry = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'country'])
  );
};

/* istanbul ignore next */
export const getPageLabels = state => {
  return state.Labels; // && state.Labels.StoreLocator;
};

export const getStoreInfo = state => {
  return state[STORE_LOCATOR_REDUCER_KEY];
};

export const getFavoriteStore = state => {
  return state[USER_REDUCER_KEY].get('favoriteStore');
};
