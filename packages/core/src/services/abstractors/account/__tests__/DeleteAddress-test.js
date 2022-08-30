import { deleteAddressApi } from '../DeleteAddress';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#deleteAddressApi', () => {
  const payloadArgs = {
    nickName: 'sb_2019-08-07 03:31:00.694',
  };
  it('Should delete the specific address', () => {
    const result = {
      addressId: ['167307'],
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    deleteAddressApi(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {
      body: {
        errors: [
          {
            errorMessage: 'Test Error Message',
          },
        ],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    deleteAddressApi(payloadArgs).then(data => {
      expect(data).toEqual('Test Error Message');
    });
  });

  it('Should throw errors in case of unable to connect to server', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {
      body: {},
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    deleteAddressApi(payloadArgs).then(data => {
      expect(data).toEqual('Your action could not be completed due to system error!!!!');
    });
  });
});
