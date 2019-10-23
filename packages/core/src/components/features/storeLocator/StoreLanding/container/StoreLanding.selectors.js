import {
  STORE_LOCATOR_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';

export const getCurrentCountry = state => {
  return state[SESSIONCONFIG_REDUCER_KEY] && state[SESSIONCONFIG_REDUCER_KEY].siteDetails.country;
};

export const getPageLabels = ({ Labels }) => {
  const pageLabels = Labels.StoreLocator;
  let finalLabels = {};
  if (pageLabels !== undefined) {
    const { StoreLanding, StoreDetail, StoreList } = pageLabels;
    finalLabels = {
      ...StoreLanding,
      ...StoreDetail,
      ...StoreList,
    };
  }
  return finalLabels;
};

export const getStoreInfo = state => {
  return state[STORE_LOCATOR_REDUCER_KEY];
};
