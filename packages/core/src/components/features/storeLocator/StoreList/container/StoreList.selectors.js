import { createSelector } from 'reselect';
import { STORE_LIST_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const storeLocatorLabels = state => state.Labels.StoreLocator;

export const getLabels = createSelector(
  storeLocatorLabels,
  locatorLabels => locatorLabels && locatorLabels.StoreList
);

export const getStoreFormattedList = (state, id) => {
  return state[STORE_LIST_REDUCER_KEY].get(`storesSummaryList${id}`);
};
