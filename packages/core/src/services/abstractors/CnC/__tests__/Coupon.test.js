import { executeStatefulAPICall } from '../../../handler/handler';
import { getAllCoupons } from '../Coupon';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('getAllCoupons abstractor', () => {
  it('should return response on success', () => {
    const response = {
      body: {
        offers: [],
      },
    };
    executeStatefulAPICall.mockResolvedValue(response);
    getAllCoupons().then(res => expect(res).toBe(response));
  });
});
