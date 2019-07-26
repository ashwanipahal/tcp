import { getOrderDetailsData, flatCurrencyToCents } from '../CartItemTile';
// TODO - Include more test cases
describe('#getOrderPointSummary', () => {
  it('should return valid response', () => {
    const result = getOrderDetailsData();
    result.then(res => expect(res).toBe('foo'));
  });
  it('should return valid currency', () => {
    const resultType = flatCurrencyToCents(123);
    expect(resultType).toEqual('123.00');
  });
});
