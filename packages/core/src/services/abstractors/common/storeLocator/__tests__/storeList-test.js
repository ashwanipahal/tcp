import { getStoresByCountry } from '../storeList';
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
});
