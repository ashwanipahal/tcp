import { call, put } from 'redux-saga/effects';
import { fetchLocationStoresSaga } from '../StoreLocator.saga';
import suggestedStores from '../__mocks__/suggestedStore';
import { setStoresByCoordinates } from '../StoreLocator.actions';
import { getLocationStores } from '../../../../../services/abstractors/common/storeLocator';

jest.mock('../../../../../services/abstractors/common/storeLocator', () => ({
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
