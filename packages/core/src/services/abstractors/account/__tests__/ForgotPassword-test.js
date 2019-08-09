import { forgotPassword } from '../ForgotPassword';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#forgotPassword', () => {
  it('should send forgot password instructions to user', () => {
    const payloadArgs = {
      formFlag: 'true',
      isPasswordReset: 'true',
      logonId: 'SATYAVAN.DASH@GMAIL.COM',
      reLogonURL: 'ChangePassword',
    };
    const result = {
      userId: '295759',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    forgotPassword(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    const payloadArgs = {
      formFlag: 'true',
      isPasswordReset: 'true',
      logonId: 'SATYAVAN.DASH@GMAIL.COM',
      reLogonURL: 'ChangePassword',
    };
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    forgotPassword(payloadArgs).then(data => {
      expect(data).toEqual('res body is null');
    });
  });
});
