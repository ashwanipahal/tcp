import { fromJS } from 'immutable';
import STORE_LOCATOR_CONSTANTS from '../StoreLocator.constants';

import StoreLocatorReducer, { initialState } from '../StoreLocator.reducer';
import suggestedStores from '../__mocks__/suggestedStore';

describe('StoreLocatorReducer', () => {
  // eslint-disable-next-line no-unused-vars
  let state = {};
  beforeEach(() => {
    state = fromJS(initialState);
  });

  test('STORES_SET_SUGGESTED_STORES', () => {
    const action = {
      type: STORE_LOCATOR_CONSTANTS.STORES_SET_SUGGESTED_STORES,
      payload: suggestedStores,
    };
    const storeSuggestedStore = StoreLocatorReducer(state, action);
    expect(storeSuggestedStore.get('suggestedStores')).toBe(suggestedStores);
  });
});
