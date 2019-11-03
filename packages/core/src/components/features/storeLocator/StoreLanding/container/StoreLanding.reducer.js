import { fromJS } from 'immutable';
import { DEFAULT_REDUCER_KEY } from '@tcp/core/src/utils/cache.util';
import STORE_LOCATOR_CONSTANTS from './StoreLanding.constants';

export const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  suggestedStores: [],
  currentStore: {},
  defaultStore: null,
  geoDefaultStore: null,
  storesSummaryListUS: [],
  storesSummaryListCA: [],
  storesSummaryListOthers: [],
  bopisStoresOnCart: [],
  bopisItemInventory: [],
  searchDone: false,
});

const StoreLocatorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case STORE_LOCATOR_CONSTANTS.STORES_SET_SUGGESTED_STORES:
      return state.set('suggestedStores', payload).set('searchDone', true);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default StoreLocatorReducer;
