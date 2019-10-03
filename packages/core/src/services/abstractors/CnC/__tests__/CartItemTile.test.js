import {
  getOrderDetailsData,
  flatCurrencyToCents,
  getCurrentOrderFormatter,
  getProductImgPath,
  getSwatchImgPath,
  imageGenerator,
  constructCouponStructure,
} from '../CartItemTile';
import { response, orderDetailsResponse, couponResponse, couponFormatResponse } from './mockData';

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
  it('should return valid getCurrentOrderFormatter', () => {
    const result = getCurrentOrderFormatter(orderDetailsResponse, false, false);
    const {
      checkout: {
        shipping: {
          address: { addressId, ...rest },
          ...restShipping
        },
        ...restCheckout
      },
      ...restResp
    } = response;
    const responseData = {
      ...restResp,
      checkout: { ...restCheckout, shipping: { address: rest, ...restShipping } },
    };
    expect(result).toEqual(responseData);
  });

  it('should return getSwatchImgPath=', () => {
    const resultType = getSwatchImgPath(12, 'extension');
    expect(resultType).toEqual('/wcsstore/GlobalSAS/images/tcp/products/swatches/12');
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
  it('should return valid constructCouponStructure', () => {
    let result = constructCouponStructure(couponResponse);
    result = Object.assign({}, result[0], {
      expirationDateTimeStamp: '',
    });
    expect([result]).toEqual(couponFormatResponse);
  });

  it('should return valid constructCouponStructure response', () => {
    const temp = [
      {
        ...couponResponse[0],
        offerType: 'PC',
      },
    ];
    const expected = [
      {
        ...couponFormatResponse[0],
        offerType: 'PLACECASH',
        promotionType: 'PLACECASH',
        redemptionType: 'PLACECASH',
      },
    ];
    let result = constructCouponStructure(temp);
    result = Object.assign({}, result[0], {
      expirationDateTimeStamp: '',
    });
    expect([result]).toEqual(expected);
  });

  it('should return valid constructCouponStructure LOYALTY', () => {
    const temp = [
      {
        ...couponResponse[0],
        offerType: 'LOYALTY',
      },
    ];
    const expected = [
      {
        ...couponFormatResponse[0],
        offerType: 'rewards',
        promotionType: 'LOYALTY',
        redemptionType: 'LOYALTY',
      },
    ];
    let result = constructCouponStructure(temp);
    result = Object.assign({}, result[0], {
      expirationDateTimeStamp: '',
    });
    expect([result]).toEqual(expected);
  });

  it('should return valid constructCouponStructure isApplied', () => {
    const temp = [
      {
        ...couponResponse[0],
        isApplied: true,
      },
    ];
    const expected = [
      {
        ...couponFormatResponse[0],
        offerType: 'saving',
        status: 'applied',
        labelStatus: 'REMOVE',
      },
    ];
    let result = constructCouponStructure(temp);
    result = Object.assign({}, result[0], {
      expirationDateTimeStamp: '',
    });
    expect([result]).toEqual(expected);
  });
});
