import { fromJS } from 'immutable';
import { DEFAULT_REDUCER_KEY } from '@tcp/core/src/utils/cache.util';
import constants from './StoreDetail.constants';

export const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  suggestedStores: [],
  defaultStore: null,
  geoDefaultStore: null,
  storesSummaryListUS: [],
  storesSummaryListCA: [],
  storesSummaryListOthers: [],
  bopisStoresOnCart: [],
  bopisItemInventory: [],
  storelocator_Promo1: '',
  storelocator_Promo2: '',
  storelocator_Promo3: '',
});

const StoreDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CURRENT_STORE:
      return state.set('currentStore', action.payload);
    case constants.SET_SUGGESTED_STORE:
      return state.set('suggestedStores', action.payload.nearByStores);
    case constants.SET_MODULEX_CONTENT:
      return state.set(action.payload.key, action.payload.value);
    case constants.SET_DISTANCE:
      return state.set('storeDistanceFromUser', action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default StoreDetailReducer;
