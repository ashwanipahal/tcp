import { getCurrentStoreInfoApi, getNearByStoreApi, hasGymboreeStores } from '../storeDetail';
import infoStores from '../__mocks__/getStoreInfo';
import { executeStatefulAPICall } from '../../../../handler';
import nearByMock from '../__mocks__/nearByStores';

jest.mock('../../../../handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('Store Detail Abstractor', () => {
  test('getCurrentStoreInfoApi', () => {
    executeStatefulAPICall.mockImplementation(() => new Promise(resolve => resolve(infoStores)));

    const storeInfo = getCurrentStoreInfoApi('110850');
    expect(typeof storeInfo).toBe('object');
    storeInfo.then(item => {
      expect(item).toBe({});
    });
  });
  test('getNearByStoreApi', () => {
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(nearByMock));
    const payloadData = {
      storeLocationId: '',
      getNearby: true,
      latitude: 40.69112,
      longitude: -73.98625,
    };
    const nearByStores = getNearByStoreApi(payloadData);
    nearByStores.then(stores => {
      expect(stores.length).toEqual(0);
    });
  });
  test('hasGymboreeStores', () => {
    const isGymStores = hasGymboreeStores({
      x_brands: ['TCP', 'GYM'],
    });
    expect(isGymStores).toBeTruthy();
  });
});
