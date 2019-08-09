import { deleteCardApi } from '../DeleteCard';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#deleteCardApi', () => {
  it('Should delete the specific Credit/Debit card', () => {
    const payloadArgs = {
      creditCardId: 79069,
    };
    const result = {
      action: 'D',
      creditCardId: '79069',
      redirecturl: 'AjaxLogonForm',
      viewTaskName: 'RedirectView',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    deleteCardApi(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    const payloadArgs = {
      creditCardId: 79069,
    };
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    deleteCardApi(payloadArgs).then(data => {
      expect(data).toEqual("res body is null'");
    });
  });
});
