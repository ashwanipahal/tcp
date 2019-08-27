import { trackOrderApi } from '../trackOrder';
import { executeStatefulAPICall } from '../../../../handler/handler';

jest.mock('../../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#trackOrderApi', () => {
  const payloadArgs = {
    orderNumber: '3000306507',
    emailAddress: 'GYM20081901@YOPMAIL.COM',
  };
  it('Should track the specific order', () => {
    const result = {
      success: true,
      trackingNumber: null,
      orderId: '3000306507',
      encryptedEmailAddress: encodeURIComponent('e4G1eHnGaT1VYyrOcRkHpRnzynvlWzCj'),
      pointsEarned: 12,
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    trackOrderApi(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {
      body: {
        errors: [
          {
            errorMessage: 'Test Error Messages',
          },
        ],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    trackOrderApi(payloadArgs).then(data => {
      expect(data).toEqual('Test Error Messages');
    });
  });
  it('Should throw errors in case of unexpected error', () => {
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    trackOrderApi(payloadArgs).then(data => {
      expect(data).toEqual('Oops... There was an issue, please try again.');
    });
  });
});
