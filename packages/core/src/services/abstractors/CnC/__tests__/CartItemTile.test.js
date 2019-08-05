import {
  getOrderDetailsData,
  flatCurrencyToCents,
  getCurrentOrderFormatter,
  getProductImgPath,
  getSwatchImgPath,
  imageGenerator,
} from '../CartItemTile';
import { response, orderDetailsResponse } from './mockData';

jest.mock('../../../handler/handler');

// TODO - Include more test cases
describe('#getOrderPointSummary', () => {
  it('should return valid getOrderDetailsData response', () => {
    const result = getOrderDetailsData();
    result.then(res => expect(res).toBe('foo'));
  });
  it('should return valid flatCurrencyToCents currency', () => {
    const resultType = flatCurrencyToCents(123);
    expect(resultType).toEqual(123);
  });
  it('should return valid getCurrentOrderFormatter response', () => {
    const result = getCurrentOrderFormatter(orderDetailsResponse, false, false);
    expect(result).toEqual(response);
  });

  it('should return getProductImgPath=', () => {
    const resultType = imageGenerator(12, 'extension');
    expect(resultType).toEqual({
      colorSwatch: '/wcsstore/GlobalSAS/images/tcp/products/swatches/12',
      productImages: {
        '125': '/wcsstore/GlobalSAS/images/tcp/products/125/12',
        '380': '/wcsstore/GlobalSAS/images/tcp/products/380/12',
        '500': '/wcsstore/GlobalSAS/images/tcp/products/500/12',
        '900': '/wcsstore/GlobalSAS/images/tcp/products/900/12',
      },
    });
  });
  it('should return getProductImgPath=', () => {
    const resultType = getProductImgPath(12, 'extension');
    expect(resultType).toEqual({
      '125': '/wcsstore/GlobalSAS/images/tcp/products/125/12',
      '380': '/wcsstore/GlobalSAS/images/tcp/products/380/12',
      '500': '/wcsstore/GlobalSAS/images/tcp/products/500/12',
      '900': '/wcsstore/GlobalSAS/images/tcp/products/900/12',
    });
  });

  it('should return getSwatchImgPath=', () => {
    const resultType = getSwatchImgPath(12, 'extension');
    expect(resultType).toEqual('/wcsstore/GlobalSAS/images/tcp/products/swatches/12');
  });
});
