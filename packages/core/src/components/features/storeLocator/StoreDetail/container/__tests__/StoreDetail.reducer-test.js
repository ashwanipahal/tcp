import { Map, fromJS } from 'immutable';
import StoreDetailReducer, { initialState } from '../StoreDetail.reducer';
import { setCurrentStoreInfo, setNearByStore } from '../StoreDetail.actions';

describe('StoreDetail Reducer', () => {
  it('should return state as Map object if state is passsed as an object', () => {
    const state = StoreDetailReducer({}, {});
    expect(Map.isMap(state)).toBeTruthy();
  });

  it('should get an initial state when the reducer is called first', () => {
    const state = StoreDetailReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should set the current store', () => {
    const currentStore = fromJS({
      basicInfo: {},
      hours: {
        regularHours: [],
        holidayHours: [],
        regularAndHolidayHours: [],
      },
      features: {},
    });
    const state = StoreDetailReducer(initialState, setCurrentStoreInfo(currentStore));
    const updatedState = fromJS({
      defaultStore: null,
      currentStore: {
        basicInfo: {},
        hours: {
          regularHours: [],
          holidayHours: [],
          regularAndHolidayHours: [],
        },
        features: {},
      },
      storesSummaryListUS: [],
      storesSummaryListCA: [],
      geoDefaultStore: null,
      storesSummaryListOthers: [],
      suggestedStores: [],
      cacheUntil: null,
      bopisItemInventory: [],
      bopisStoresOnCart: [],
      storelocator_Promo1: '',
      storelocator_Promo2: '',
      storelocator_Promo3: '',
    });
    expect(state).toEqual(updatedState);
  });
  it('should set the suggested stores', () => {
    const stores = {
      nearByStores: {},
    };
    const state = StoreDetailReducer(initialState, setNearByStore(stores));
    const updatedState = fromJS({
      defaultStore: null,
      currentStore: {
        basicInfo: {},
        hours: {
          regularHours: [],
          holidayHours: [],
          regularAndHolidayHours: [],
        },
        features: {},
      },
      storesSummaryListUS: [],
      storesSummaryListCA: [],
      geoDefaultStore: null,
      storesSummaryListOthers: [],
      suggestedStores: [],
      cacheUntil: null,
      bopisItemInventory: [],
      bopisStoresOnCart: [],
    });
    expect(state.suggestedStores).toEqual(updatedState.suggestedStores);
  });
});
