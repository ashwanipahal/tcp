import { fromJS } from 'immutable';
import STORE_LOCATOR_CONSTANTS from './StoreLocator.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../utils/cache.util';

const initialState = fromJS({
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
});

const StoreLocatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_LOCATOR_CONSTANTS.SET_DEFAULT_STORE:
      return state.set('defaultStore', action.payload);
    case STORE_LOCATOR_CONSTANTS.SET_GEO_DEFAULT_STORE:
      return state.set('geoDefaultStore', action.payload);
    case STORE_LOCATOR_CONSTANTS.STORES_SET_SUGGESTED_STORES:
      return state.set('suggestedStores', action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default StoreLocatorReducer;
