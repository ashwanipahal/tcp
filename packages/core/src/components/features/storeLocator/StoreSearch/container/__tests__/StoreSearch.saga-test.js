import { call, put } from 'redux-saga/effects';
import { getLocationStores } from '@tcp/core/src/services/abstractors/common/storeLocator';
import { fetchLocationStoresSaga } from '../StoreSearch.saga';
import suggestedStores from '../__mocks__/suggestedStore';
import { setStoresByCoordinates } from '../StoreSearch.actions';

jest.mock('tcp/core/src/services/abstractors/common/storeLocator', () => ({
  getLocationStores: jest.fn(),
}));

describe('Store Locator saga', () => {
  describe('fetchLocationStoresSaga', () => {
    getLocationStores.mockImplementation(() => new Promise(resolve => resolve(suggestedStores)));
    const payload = {
      coordinates: {
        lat: 77,
        lng: 22,
      },
      maxItems: 10,
    };
    const generator = fetchLocationStoresSaga({ payload });

    test('default', () => {
      const returnValue = call(getLocationStores, payload);
      expect(generator.next().value).toEqual(returnValue);
      expect(generator.next().value).toEqual(put(setStoresByCoordinates()));
    });

    test('error', () => {
      expect(generator.throw().value).toEqual(null);
    });
  });
});
