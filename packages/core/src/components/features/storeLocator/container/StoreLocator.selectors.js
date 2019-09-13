/* istanbul ignore file */
import {
  SESSIONCONFIG_REDUCER_KEY,
  STORE_LOCATOR_REDUCER_KEY,
} from '../../../../constants/reducer.constants';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentCountry = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'country'])
  );
};

export const getStoreInfo = state => {
  return state[STORE_LOCATOR_REDUCER_KEY];
};

export const getSuggestedStoreById = (state, storeId) => {
  return state[STORE_LOCATOR_REDUCER_KEY].get('suggestedStores').find(
    stores => stores.basicInfo.id === storeId
  );
};
