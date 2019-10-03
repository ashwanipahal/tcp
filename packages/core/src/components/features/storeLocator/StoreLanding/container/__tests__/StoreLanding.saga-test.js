import { call, takeLatest, select } from 'redux-saga/effects';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import { getLocationStores } from '@tcp/core/src/services/abstractors/common/storeLocator';
import STORE_LOCATOR_CONSTANTS from '../StoreLanding.constants';
import StoreSaga, {
  fetchLocationStoresSaga,
  getFavoriteStoreSaga,
  setFavoriteStoreSaga,
} from '../StoreLanding.saga';

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
    const payload = {
      coordinates: {
        lat: 77,
        lng: 22,
      },
      maxItems: 10,
    };

    test('default', () => {
      const generator = fetchLocationStoresSaga({ payload });
      expect(generator.next().value).toEqual(call(getLocationStores, payload));
      expect(generator.next().value).toEqual(null);
    });
  });

  describe('getFavoriteStoreSaga', () => {
    const payload = {
      coordinates: {
        lat: 77,
        lng: 22,
      },
      maxItems: 10,
    };

    test('default', () => {
      const generator = getFavoriteStoreSaga({ payload });
      expect(generator.next().value).toEqual(select());
      expect(typeof generator.next().value).toEqual('object');
      expect(generator.next().value).toEqual(null);
    });
  });

  describe('setFavoriteStoreSaga', () => {
    const payload = {
      coordinates: {
        lat: 77,
        lng: 22,
      },
      maxItems: 10,
      basicInfo: {
        id: 1211,
      },
    };

    test('default', () => {
      const generator = setFavoriteStoreSaga({ payload });
      expect(generator.next().value).toEqual(select());
      expect(typeof generator.next().value).toEqual('object');
      expect(generator.next().value).toEqual(undefined);
    });
  });
});
