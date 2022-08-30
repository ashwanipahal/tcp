import { formatAddressBookResponse, getProfile, login, parseBoolean } from '../Login';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#parseBoolean', () => {
  it('should return true when true is passed', () => {
    expect(parseBoolean(true)).toBeTruthy();
  });
  it('should return true when 1 is passed', () => {
    expect(parseBoolean('1')).toBeTruthy();
  });
  it('should return true when TRUE is passed', () => {
    expect(parseBoolean('TRUE')).toBeTruthy();
  });
  it('should return false when anything is passed', () => {
    expect(parseBoolean('FALSE')).toBeFalsy();
  });
});

describe('#login', () => {
  it('should login incase of successfull request', () => {
    const payloadArgs = {
      emailAddress: '',
      password: '',
      rememberMe: true,
      plccCardId: '',
      recaptchaToken: '',
      userId: '',
    };
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    login(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    const payloadArgs = {
      emailAddress: '',
      password: '',
      rememberMe: true,
      plccCardId: '',
      recaptchaToken: '',
      userId: '',
    };
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    login(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });
});

describe('#getProfile', () => {
  it('should get the profile of the user', () => {
    const payloadArgs = {};
    const result = {
      body: {
        contact: [],
        x_isRegistered: 'true',
        x_survey: '{"answer1":"Gifting for others","answer2":"Toddler Boy"}',
        contextAttribute: [
          {
            attributeName: 'test',
            attributeValue: [
              {
                value: ['value'],
              },
            ],
          },
        ],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    getProfile(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });
  it('Should throw errors in case of server side error', () => {
    const payloadArgs = {};
    // TO DO - Add appropirate server side messages for Test
    const result = {
      body: {
        errorCode: 'test',
        errorKey: '_testError',
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    getProfile(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });
});

describe('#formatAddressBookResponse', () => {
  it('should format the address book response', () => {
    const payloadArgs = [
      {
        primary: true,
        addressId: 'test',
        nickName: 'test',
        firstName: 'test',
        lastName: 'test',
        addressLine: ['test', 'test'],
        city: 'test',
        state: 'test',
        country: 'test',
        zipCode: 'test',
        email1: 'test',
        phone1: 'test',
        addressType: 'test',
      },
    ];
    const result = [
      {
        addressId: 'test',
        addressKey: 'test',
        address: {
          firstName: 'test',
          lastName: 'test',
          addressLine1: 'test',
          addressLine2: 'test',
          city: 'test',
          state: 'test',
          country: 'test',
          zipCode: 'test',
        },
        emailAddress: 'test',
        phoneNumber: 'test',
        type: 'test',
        isDefault: true,
      },
    ];
    expect(formatAddressBookResponse(payloadArgs)).toEqual(result);
  });
});
