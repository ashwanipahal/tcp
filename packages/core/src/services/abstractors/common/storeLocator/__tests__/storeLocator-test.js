import { fromJS, List } from 'immutable';
import {
  getLocationStores,
  getFavoriteStore,
  setFavoriteStore,
  storeResponseParser,
  getDistance,
  getStoreTypeDetail,
  getAddress,
  getBasicInfo,
  getStoreNameVal,
} from '../storeLocator';
import mockStoreByLatLngData, { mockLocResponse } from '../__mocks__/locationStores';
import { executeStatefulAPICall } from '../../../../handler';
import getFavoriteStoreMockData, { parsedStoreInfoMockData } from '../__mocks__/getFavStore';
import { suggestedStores, responseOnSet } from '../__mocks__/setFavStore';

jest.mock('../../../../handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('Store Locator Abstractor', () => {
  test('getLocationStores', () => {
    executeStatefulAPICall.mockImplementation(
      () => new Promise(resolve => resolve(mockStoreByLatLngData))
    );
    const inputparams = {
      coordinates: {
        lat: 77,
        lng: 22,
      },
      maxItems: 10,
    };

    const locationStore = getLocationStores(inputparams);
    expect(typeof locationStore).toBe('object');
    locationStore.then(item => {
      expect(item).toBe(mockLocResponse);
    });
  });
  test('getFavoriteStore - if user is logged in', () => {
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(getFavoriteStoreMockData));
    const payloadData = {
      geoLatLong: {
        lat: 40.69112,
        long: -73.98625,
      },
    };
    const state = {
      User: fromJS({
        personalData: fromJS({
          isGuest: false,
        }),
      }),
    };
    const favStore = getFavoriteStore(payloadData, state);
    expect(typeof favStore).toBe('object');
    favStore.then(stores => {
      expect(stores).toMatchObject(parsedStoreInfoMockData);
    });
  });
  test('setFavoriteStore', () => {
    executeStatefulAPICall.mockImplementation(() => Promise.resolve({}));
    const state = {
      User: fromJS({
        personalData: fromJS({
          userId: '439218345',
        }),
      }),
      StoreLocatorReducer: fromJS({
        suggestedStores: List(suggestedStores),
      }),
    };
    const favStore = setFavoriteStore('110850', state);
    expect(typeof favStore).toBe('object');
    favStore.then(stores => {
      expect(stores).toMatchObject({ ...responseOnSet, timestamp: favStore.timestamp });
    });
  });
  test('storeResponseParser', () => {
    const configs = { requestedQuantity: 0 };
    const result = storeResponseParser(getFavoriteStoreMockData, configs);
    expect(result).toMatchObject(parsedStoreInfoMockData);
  });
  test('getAddress', () => {
    const result = getAddress(getFavoriteStoreMockData);
    expect(result).toMatchObject(parsedStoreInfoMockData.basicInfo.address);
  });
  test('getBasicInfo', () => {
    const result = getBasicInfo(getFavoriteStoreMockData);
    expect(result).toMatchObject(parsedStoreInfoMockData.basicInfo);
  });
  test('getStoreNameVal', () => {
    const result = getStoreNameVal(getFavoriteStoreMockData);
    expect(result).toEqual(parsedStoreInfoMockData.basicInfo.storeName);
  });
  test('getDistance', () => {
    const result = getDistance(getFavoriteStoreMockData);
    expect(result).toBeNull();
  });
  test('getStoreTypeDetail', () => {
    const result = getStoreTypeDetail(getFavoriteStoreMockData);
    expect(result).toEqual('PLACE');
  });
});
