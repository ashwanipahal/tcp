import { getCacheData, setCacheData } from '../localCache.util';
import { isClient } from '../utils';

jest.mock('../utils.web', () => ({
  getLocalStorage: () =>
    JSON.stringify({
      item: { city: 'NY', country: 'USA' },
      item1: { city: 'LA', country: 'USA' },
      item2: { city: 'CY', country: 'USA' },
      item3: { city: 'NA', country: 'USA' },
      item4: { city: 'DL', country: 'USA' },
      item5: { city: 'DC', country: 'USA' },
      item6: { city: 'IL', country: 'USA' },
      item7: { city: 'UI', country: 'USA' },
      item8: { city: 'DS', country: 'USA' },
      item9: { city: 'LV', country: 'USA' },
      item10: { city: 'NI', country: 'USA' },
      item11: { city: 'UT', country: 'CA' },
    }),
  setLocalStorage: () => true,
}));

jest.mock('../utils', () => ({
  isClient: jest.fn(),
}));

describe('cache util', () => {
  test('getCacheData', () => {
    isClient.mockImplementation(() => true);
    const key = 'item';
    const getCacheDataFn = getCacheData(key, 'item');
    expect(getCacheDataFn).toBeFalsy();
  });

  test('getCacheData - no valid objectKey', () => {
    isClient.mockImplementation(() => true);
    const key = 'testItem';
    const getCacheDataFn = getCacheData(key, 'testItem');
    expect(getCacheDataFn).toBeFalsy();
  });

  test('getCacheData - no client', () => {
    isClient.mockImplementation(() => false);
    const key = 'item';
    const obj = {
      item: {
        country: 'USA',
        city: 'NY',
        lat: 77,
        lng: 22,
      },
    };
    const getCacheDataFn = getCacheData(key, obj);
    expect(getCacheDataFn).toBeFalsy();
  });

  test('setCacheData', () => {
    isClient.mockImplementation(() => true);
    const args = {
      key: 'location',
      storageKey: 'searchedLocation',
      storageValue: JSON.stringify({ country: 'USA', city: 'NY' }),
    };
    expect(setCacheData(args)).toBeTruthy();
  });

  test('setCacheData - no client', () => {
    isClient.mockImplementation(() => false);
    const args = {
      key: 'location',
      storageKey: 'searchedLocation',
      storageValue: JSON.stringify({ country: 'USA', city: 'NY' }),
    };
    expect(setCacheData(args)).toBeFalsy();
  });
});
