import briteVerifyStatusExtraction from '../briteVerifyStatusExtraction';
import * as handler from '../../../../handler/handler';

jest.mock('../../../../../service/API');
jest.mock('../../../../handler/handler');

handler.executeExternalAPICall = jest.fn();
handler.executeExternalAPICall.mockImplementation(() => {
  return Promise.resolve({
    body: {
      status: 'accept_all',
    },
  });
});

describe('briteVerifyStatusExtraction abstractor', () => {
  test('verify email address', () => {
    return briteVerifyStatusExtraction('tcp@gmail.com').then(data => {
      expect(data).toBe('accept_all::false:false');
    });
  });
});
