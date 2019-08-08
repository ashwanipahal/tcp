import handler from '../../../handler/handler';
import { resetPassword } from '../ResetPassword';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('resetPassword abstractor', () => {
  it('should return response on success', () => {
    const response = {
      userId: '12345',
    };
    // eslint-disable-next-line import/no-named-as-default-member
    handler.executeStatefulAPICall.mockResolvedValue(response);
    resetPassword({
      newPassword: 'test',
      newPasswordVerify: 'test',
      logonPasswordOld: '12345',
      em: '12345',
    }).then(res => expect(res).toBe(response));
  });
});
