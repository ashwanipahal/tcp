import handler from '../../../handler/handler';
import { resetPassword, errorHandler } from '../ResetPassword';

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

  it('errorHandler should throw genericError if error object is not present', () => {
    try {
      errorHandler({
        response: null,
      });
    } catch (err) {
      expect(err).toBe('genericError');
    }
  });

  it('errorHandler should throw errorKey if error object is present', () => {
    try {
      errorHandler({
        response: {
          body: {
            errors: [
              {
                errorKey: 'errorKey',
              },
            ],
          },
        },
      });
    } catch (err) {
      expect(err).toBe('errorKey');
    }
  });
});
