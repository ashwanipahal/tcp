import { getStoresByCountry, getBasicInfo } from '../storeList';
import list from '../__mocks__/storeList';
import responseMock from '../__mocks__/storeListMockResponse';
import { executeStatefulAPICall } from '../../../../handler';

jest.mock('../../../../handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('Store List Abstractor', () => {
  test('getStoresByCountry', () => {
    executeStatefulAPICall.mockImplementation(() => new Promise(resolve => resolve(list)));
    const inputparams = {
      id: 'US',
      currencyId: 'USD',
      displayName: 'United States',
      siteId: 'us',
    };

    const stores = getStoresByCountry(inputparams);
    stores.then(item => {
      expect(item).toEqual(responseMock.result);
    });
  });
  test('getBasicInfo', () => {
    const store = {
      Description: [
        {
          displayStoreName: 'test',
        },
      ],
      uniqueID: 'test',
      addressLine: ['test'],
      city: 'test',
      stateOrProvinceName: 'test',
      postalCode: 'test',
      telephone1: '012 34567899',
    };
    const formattedResponse = {
      basicInfo: {
        id: 'test',
        storeName: 'test',
        address: {
          addressLine1: 'test',
          city: 'test',
          state: 'test',
          zipCode: 'test',
        },
        phone: '(012) 345-67899',
      },
    };
    const formattedStore = getBasicInfo(store);
    expect(formattedStore).toEqual(formattedResponse);
  });
});
