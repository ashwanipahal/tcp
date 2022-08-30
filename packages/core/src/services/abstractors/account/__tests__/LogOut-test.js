import { LogoutApplication } from '../LogOut';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#LogoutApplication', () => {
  it('should able to logout', () => {
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    LogoutApplication().then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    LogoutApplication().then(data => {
      expect(data).toEqual('res body is null');
    });
  });
});
