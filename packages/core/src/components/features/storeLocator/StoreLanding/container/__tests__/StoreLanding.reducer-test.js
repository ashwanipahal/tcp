import { fromJS } from 'immutable';
import STORE_LOCATOR_CONSTANTS from '../StoreLanding.constants';

import StoreLocatorReducer, { initialState } from '../StoreLanding.reducer';
import suggestedStores from '../__mocks__/suggestedStore';
import { setFavStoreResponse, favoriteStore } from '../__mocks__/favoriteStore';

describe('StoreLocatorReducer', () => {
  let state = {};
  beforeEach(() => {
    state = fromJS(initialState);
  });

  test('DEFAULT', () => {
    const action = {};
    const storeChanged = StoreLocatorReducer(state, action);
    expect(storeChanged).toBe(initialState);
  });

  test('DEFAULT - no state', () => {
    const action = {};
    const storeChanged = StoreLocatorReducer(undefined, action);
    expect(storeChanged).toBe(initialState);
  });

  test('DEFAULT - no state instance of object', () => {
    const action = {};
    state = 'string-value';
    const storeChanged = StoreLocatorReducer(state, action);
    expect(storeChanged).toBe(state);
  });

  test('STORES_SET_SUGGESTED_STORES', () => {
    const action = {
      type: STORE_LOCATOR_CONSTANTS.STORES_SET_SUGGESTED_STORES,
      payload: suggestedStores,
    };
    const storeSuggestedStore = StoreLocatorReducer(state, action);
    expect(storeSuggestedStore.get('suggestedStores')).toBe(suggestedStores);
  });

  test('SET_DEFAULT_STORE', () => {
    const action = {
      type: STORE_LOCATOR_CONSTANTS.SET_DEFAULT_STORE,
      payload: setFavStoreResponse,
    };
    const storeSuggestedStore = StoreLocatorReducer(state, action);
    expect(storeSuggestedStore.get('defaultStore')).toBe(setFavStoreResponse);
  });

  test('SET_GEO_DEFAULT_STORE', () => {
    const action = {
      type: STORE_LOCATOR_CONSTANTS.SET_GEO_DEFAULT_STORE,
      payload: favoriteStore,
    };
    const storeSuggestedStore = StoreLocatorReducer(state, action);
    expect(storeSuggestedStore.get('geoDefaultStore')).toBe(favoriteStore);
  });
});
