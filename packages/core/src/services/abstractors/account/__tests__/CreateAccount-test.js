import { createAccountApi } from '../CreateAccount';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#createAccountApi', () => {
  it('Should get all the list of the addresses', () => {
    const payloadArgs = {
      firstName: 'Satyavans',
      lastName: 'Dash',
      emailAddress: 'satyavan.dash@gmail.com',
      password: 'Ju!y@0911534',
      phoneNumber: '2345678999',
      rememberMe: true,
      noCountryZip: '75124',
    };
    const result = {
      responseCode: 'registrationSuccess',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    createAccountApi(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    const payloadArgs = {
      firstName: 'Satyavans',
      lastName: 'Dash',
      emailAddress: 'satyavan.dash@gmail.com',
      password: 'Ju!y@0911534',
      phoneNumber: '2345678999',
      rememberMe: true,
      noCountryZip: '75124',
    };
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
    createAccountApi(payloadArgs).then(data => {
      expect(data).toEqual('res body is null');
    });
  });
});
