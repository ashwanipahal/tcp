import productListTabsAbstractor from '../productListTabs';
import * as handler from '../../../../handler/handler';
import mock from '../mock';

jest.mock('../../../../../service/API');
jest.mock('../../../../handler/handler');

const mockResponse = mock.body.response.products;

describe('ProductListTabsAbstractor', () => {
  it('Should fetch and return processed product tab list', () => {
    handler.executeUnbxdAPICall = jest.fn();
    handler.executeUnbxdAPICall.mockImplementation(() => {
      return Promise.resolve(mock);
    });

    return productListTabsAbstractor.getData({ categoryId: '348734' }).then(data => {
      expect(data).toMatchObject(mockResponse);
    });
  });

  it('Should verify fetch failure', () => {
    handler.executeUnbxdAPICall = jest.fn();
    handler.executeUnbxdAPICall.mockImplementation(() => {
      return Promise.reject();
    });

    return productListTabsAbstractor.getData({ categoryId: '348734' }).then(data => {
      expect(data).toBeUndefined();
    });
  });
});
