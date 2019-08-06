import {
  getOrderDetailsData,
  flatCurrencyToCents,
  getCurrentOrderFormatter,
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
    expect(result).toEqual(response);
  });

  it('should return valid constructCouponStructure', () => {
    const result = constructCouponStructure(couponResponse);
    expect(result).toEqual(couponFormatResponse);
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
        promotionType: 'PLACECASH',
        redemptionType: 'PLACECASH',
      },
    ];
    const result = constructCouponStructure(temp);
    expect(result).toEqual(expected);
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
        promotionType: 'LOYALTY',
        redemptionType: 'LOYALTY',
      },
    ];
    const result = constructCouponStructure(temp);
    expect(result).toEqual(expected);
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
        status: 'applied',
      },
    ];
    const result = constructCouponStructure(temp);
    expect(result).toEqual(expected);
  });
});
