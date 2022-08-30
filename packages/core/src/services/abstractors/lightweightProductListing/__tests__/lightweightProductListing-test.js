import productListTabsAbstractor from '../lightweightProductListing';
import * as handler from '../../../handler/handler';
import mock from '../mock';

const mockResponse = mock.body.response.products.map(item => {
  const {
    imageUrl: [imageUrl],
  } = item;

  return {
    ...item,
    imageUrl: [
      imageUrl.replace('https://www.childrensplace.com', 'https://test4.childrensplace.com'),
    ],
  };
});

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
