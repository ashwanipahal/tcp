import { call, put, takeLatest } from 'redux-saga/effects';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import {
  getLocationStores,
  getFavoriteStore,
  setFavoriteStore,
} from '@tcp/core/src/services/abstractors/common/storeLocator';
import STORE_LOCATOR_CONSTANTS from '../StoreLanding.constants';
import StoreSaga, {
  fetchLocationStoresSaga,
  getFavoriteStoreSaga,
  setFavoriteStoreSaga,
} from '../StoreLanding.saga';
import suggestedStores from '../__mocks__/suggestedStore';
import { setStoresByCoordinates, getSetDefaultStoreActn } from '../StoreLanding.actions';
import { favoriteStore, setFavStoreResponse } from '../__mocks__/favoriteStore';

jest.mock('@tcp/core/src/services/abstractors/common/storeLocator', () => ({
  getLocationStores: jest.fn(),
  getFavoriteStore: jest.fn(),
  setFavoriteStore: jest.fn(),
}));

describe('Store Locator saga', () => {
  test('should test watch Store Landing page action', () => {
    const generator = StoreSaga();
    expect(generator.next().value).toEqual(
      takeLatest(STORE_LOCATOR_CONSTANTS.GET_LOCATION_STORES, fetchLocationStoresSaga)
    );

    expect(generator.next().value.toString()).toMatch(
      takeLatest(
        STORE_LOCATOR_CONSTANTS.GET_FAVORITE_STORE,
        validateReduxCache(getFavoriteStoreSaga)
      ).toString()
    );
    expect(generator.next().value.toString()).toMatch(
      takeLatest(
        STORE_LOCATOR_CONSTANTS.SET_FAVORITE_STORE,
        validateReduxCache(fetchLocationStoresSaga)
      ).toString()
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

  describe('getFavoriteStoreSaga', () => {
    const payload = {
      skuId: null,
      geoLatLang: { lat: 22, long: 77 },
      variantId: '1232-absas-1121-iaaq',
      quantity: 1,
    };

    const generator = getFavoriteStoreSaga({ payload });

    test('should set default store', () => {
      getFavoriteStore.mockImplementation(() => new Promise(resolve => resolve(favoriteStore)));
      const returnValue = call(getFavoriteStore, payload);
      generator.next();
      expect(generator.next(returnValue).value).toStrictEqual(
        put(getSetDefaultStoreActn(returnValue))
      );
    });

    test('error', () => {
      expect(generator.throw().value).toEqual(null);
    });
  });

  describe('setFavoriteStoreSaga', () => {
    const payload = '110685';
    const generator = setFavoriteStoreSaga({ payload });

    test('should yield false value', () => {
      setFavoriteStore.mockImplementation(
        () => new Promise(resolve => resolve(setFavStoreResponse))
      );
      generator.next();
      call(setFavoriteStore, payload, {});
      generator.next();
      expect(generator.next().value).toBeFalsy();
    });

    test('error', () => {
      expect(generator.throw().value).toEqual(null);
    });
  });
});
