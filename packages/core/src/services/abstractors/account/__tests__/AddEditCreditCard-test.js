import { addCreditCard, updateCreditCard } from '../AddEditCreditCard';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

const errorMessage = 'Test Error Messages';

describe('#updateCreditCard', () => {
  const payloadArgs = {
    isDefault: true,
    addressId: '167310',
    creditCardId: '74597',
    city: 'Burnwell',
    country: 'US',
    firstName: 'Satyavans',
    lastName: 'Dash',
    phoneNumber: '12345678999',
    primary: true,
    state: 'AL',
    zipCode: '35038',
    email: 'satyavan.dash@gmail.com',
    addressLine1: 'Asdasd',
    addressLine2: 'Asd',
    nickName: '',
    cardNumber: '************0105',
    expMonth: '4',
    cardType: 'MC',
    expYear: '2027',
  };
  it('should update credit card details and give success response', () => {
    const result = {
      addressId: '167310',
      billing_address1: 'Asdasd',
      billing_address2: 'Asd',
      billing_addressField3: '35038',
      billing_city: 'Burnwell',
      billing_country: 'US',
      billing_firstName: 'Satyavans',
      billing_lastName: 'Dash',
      billing_nickName: '',
      billing_phone1: '',
      billing_state: 'AL',
      billing_zipCode: '35038',
      creditCardId: 74597,
      isDefault: 'true',
      isRest: ['true'],
      payMethodId: 'COMPASSMASTERCARD',
      pay_account: '************0105',
      pay_expire_month: '4',
      pay_expire_year: '2027',
      redirecturl: 'AjaxLogonForm',
      viewTaskName: 'RedirectView',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    updateCreditCard(payloadArgs).then(data => {
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
    updateCreditCard(payloadArgs).then(data => {
      expect(data).toEqual('Test Error Message');
    });
  });

  it('Should throw errors in case of unable to connect to server', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    updateCreditCard(payloadArgs).then(data => {
      expect(data).toEqual('Your action could not be completed due to system error');
    });
  });
});

describe('#addCreditCard', () => {
  const payloadArgs = {
    isDefault: true,
    addressId: '167310',
    creditCardId: '74597',
    city: 'Burnwell',
    country: 'US',
    firstName: 'Satyavans',
    lastName: 'Dash',
    phoneNumber: '12345678999',
    primary: true,
    state: 'AL',
    zipCode: '35038',
    email: 'satyavan.dash@gmail.com',
    addressLine1: 'Asdasd',
    addressLine2: 'Asd',
    nickName: '',
    cardNumber: '4444444444444449',
    expMonth: '4',
    cardType: 'MC',
    expYear: '2027',
  };

  it('should add credit card and give success response', () => {
    const result = {
      addressId: 167310,
      billing_address1: 'Asdasd',
      billing_address2: 'Asd',
      billing_addressField3: '35038',
      billing_city: 'Burnwell',
      billing_country: 'US',
      billing_firstName: 'Satyavans',
      billing_lastName: 'Dash',
      billing_nickName: '',
      billing_phone1: '',
      billing_state: 'AL',
      billing_zipCode: '35038',
      creditCardId: '79069',
      isDefault: 'false',
      isRest: ['true'],
      payMethodId: 'COMPASSVISA',
      pay_account: '4444444444444449',
      pay_expire_month: '7',
      pay_expire_year: '2021',
      phone1Publish: 'false',
      redirecturl: 'AjaxLogonForm',
      viewTaskName: 'RedirectView',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    addCreditCard(payloadArgs).then(data => {
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
    addCreditCard(payloadArgs).then(data => {
      expect(data).toEqual('Test Error Message');
    });
  });

  it('Should throw errors in case of unable to connect to server', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    addCreditCard(payloadArgs).then(data => {
      expect(data).toEqual('Your action could not be completed due to system error');
    });
  });
});
