import { getLocationStores } from '../storeLocator';
import mockStoreByLatLngData, { mockLocResponse } from '../__mocks__/locationStores';

jest.mock('../../../../handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

/* eslint-disable-next-line import/first */
import { executeStatefulAPICall } from '../../../../handler';

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
});
