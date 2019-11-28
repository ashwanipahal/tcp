import { setUserGroup } from '../userGroup';

import { executeStatefulAPICall } from '../../../../handler/handler';

jest.mock('../../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('setUserGroup abstractor', () => {
  it('it should call setuser group', () => {
    const result = { Response: 'Success' };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    setUserGroup().then(data => {
      expect(data).toMatchObject(result);
    });
  });
});
