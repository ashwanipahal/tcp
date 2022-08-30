import { addAddress, updateAddress } from '../AddEditAddress';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));
const errorMessage = 'Test Error Messages';

describe('#updateAddress', () => {
  const payloadArgs = {
    nickName: '',
    address1: 'Asdasd',
    address2: 'Asd',
    city: 'Burnwell',
    country: 'US',
    firstName: 'Satyavans',
    lastName: 'Dash',
    phoneNumber: '12345678999',
    primary: true,
    state: 'AL',
    zip: '35038',
    email: 'satyavan.dash@gmail.com',
  };
  it('should update address and give response', () => {
    const result = {
      addressId: '167302',
      nickName: 'sb_2019-07-26 02:30:48.116',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    updateAddress(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });
  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {
      body: {
        errors: [
          {
            errorMessage,
          },
        ],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    updateAddress(payloadArgs).then(data => {
      expect(data).toEqual('Test Error Message');
    });
  });

  it('Should throw errors in case of unable to connect to server', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    updateAddress(payloadArgs).then(data => {
      expect(data).toEqual('Your action could not be completed due to system error');
    });
  });
});

describe('#addAddress', () => {
  const payloadArgs = {
    nickName: '',
    address1: 'Asdasd',
    address2: 'Asd',
    city: 'Burnwell',
    country: 'US',
    firstName: 'Satyavans',
    lastName: 'Dash',
    phoneNumber: '12345678999',
    primary: true,
    state: 'AL',
    zip: '35038',
    email: 'satyavan.dash@gmail.com',
  };
  it('should add address and give response', () => {
    const result = {
      addressId: '167305',
      nickName: 'sb_2019-08-07 03:31:12.754',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    addAddress(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {
      body: {
        errors: [
          {
            errorMessage,
          },
        ],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    addAddress(payloadArgs).then(data => {
      expect(data).toEqual('Test Error Message');
    });
  });

  it('Should throw errors in case of unable to connect to server', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    addAddress(payloadArgs).then(data => {
      expect(data).toEqual('Your action could not be completed due to system error');
    });
  });
});
