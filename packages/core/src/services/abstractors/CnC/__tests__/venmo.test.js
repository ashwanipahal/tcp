import { executeStatefulAPICall } from '../../../handler/handler';
import { getVenmoToken } from '../venmo';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('getVenmoToken abstractor', () => {
  it('should return response on success', () => {
    const response = {
      body: {
        errorCode: 'SUCCESS',
        errorMessage: 'SUCCESS',
        userState: 'R',
        orderId: '22222222',
        venmoPaymentTokenAvailable: 'FALSE',
        venmoCustomerIdAvailable: 'TRUE',
        venmoIsDefaultPaymentType: 'TRUE',
        venmoSecurityToken: 'encryptedtoken',
      },
    };
    executeStatefulAPICall.mockResolvedValue(response);
    getVenmoToken({ userState: 'R', orderId: '22222222' }).then(res => expect(res).toBe(response));
  });
});
