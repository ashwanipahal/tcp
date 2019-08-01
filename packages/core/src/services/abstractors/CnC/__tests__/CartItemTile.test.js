import {
  getOrderDetailsData,
  flatCurrencyToCents,
  getCurrentOrderFormatter,
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
});
