import { STORE_LIST_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getLabels = state => {
  return state.Labels.StoreList;
};

export const getStoreFormattedList = (state, id) => {
  return state[STORE_LIST_REDUCER_KEY].get(`storesSummaryList${id}`);
};
