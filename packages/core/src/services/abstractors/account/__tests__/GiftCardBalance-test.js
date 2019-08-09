import { getGiftCardBalanceApi } from '../GiftCardBalance';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#getGiftCardBalanceApi', () => {
  it('should get gift card balance', () => {
    const payloadArgs = {
      formData: {},
      card: {
        creditCardId: 12345,
      },
    };
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    getGiftCardBalanceApi(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });
  it('Should throw errors in case of server side error', () => {
    const payloadArgs = {
      formData: {},
      card: {
        creditCardId: 12345,
      },
    };
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    getGiftCardBalanceApi(payloadArgs).then(data => {
      expect(data).toEqual('res body is null');
    });
  });
});
