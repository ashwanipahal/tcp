import productListTabsAbstractor from '../styliticsProductListing';
import * as handler from '../../../handler/handler';
import mock from '../mock';

const mockResponse = productListTabsAbstractor.processData(mock);

describe('ProductListTabsAbstractor', () => {
  it('Should fetch and return processed stylitics product tab list', () => {
    handler.executeExternalAPICall = jest.fn();
    handler.executeExternalAPICall.mockImplementation(() => {
      return Promise.resolve(mock);
    });

    return productListTabsAbstractor.getData({ id: '2044392_10' }).then(data => {
      expect(data).toMatchObject(mockResponse);
    });
  });

  it('Should verify fetch failure', () => {
    handler.executeExternalAPICall = jest.fn();
    handler.executeExternalAPICall.mockImplementation(() => {
      return Promise.reject();
    });

    return productListTabsAbstractor.getData({ id: '2044392_10' }).then(data => {
      expect(data).toBeUndefined();
    });
  });
});
