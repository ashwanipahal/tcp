import { call, put, takeLatest } from 'redux-saga/effects';
import { getLocationStores } from '@tcp/core/src/services/abstractors/common/storeLocator';
import STORE_LOCATOR_CONSTANTS from '../StoreLanding.constants';
import StoreSaga, { fetchLocationStoresSaga } from '../StoreLanding.saga';
import suggestedStores from '../__mocks__/suggestedStore';
import { setStoresByCoordinates } from '../StoreLanding.actions';

jest.mock('@tcp/core/src/services/abstractors/common/storeLocator', () => ({
  getLocationStores: jest.fn(),
}));

describe('Store Locator saga', () => {
  test('should test watch Category page action', () => {
    const generator = StoreSaga();
    expect(generator.next().value).toEqual(
      takeLatest(STORE_LOCATOR_CONSTANTS.GET_LOCATION_STORES, fetchLocationStoresSaga)
    );
  });

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
