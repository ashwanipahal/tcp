import { getModifiedPayload, setDefaultPaymentApi } from '../DefaultPayment';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#getModifiedPayload', () => {
  it('Should return modififed payload which will serve as request to setDefaultPaymentApi', () => {
    const payloadArgs = {
      accountNo: '4444444444444449',
      addressDetails: {
        addressLine1: 'Asdasd',
        addressLine2: 'Asd',
        city: 'Burnwell',
        country: 'US',
        firstName: 'Satyavans',
        lastName: 'Dash',
        phone1: '12345678999',
        state: 'AL',
        zipCode: '35038',
      },
      billingAddressId: 167310,
      ccBrand: 'Visa',
      ccType: 'COMPASSVISA',
      creditCardId: 79069,
      defaultInd: false,
      expMonth: '7 ',
      expYear: '2021',
      nameOnAccount: '.',
    };
    const result = {
      action: 'U',
      addressId: '',
      billing_address1: 'Asdasd',
      billing_address2: 'Asd',
      billing_addressField3: '35038',
      billing_city: 'Burnwell',
      billing_country: 'US',
      billing_firstName: 'Satyavans',
      billing_lastName: 'Dash',
      // billing_nickName: `Billing_10151_1565168308398`,
      billing_phone1: '12345678999',
      billing_state: 'AL',
      billing_zipCode: '35038',
      creditCardId: 79069,
      isDefault: 'true',
      payMethodId: 'COMPASSVISA',
      pay_account: '4444444444444449',
      pay_expire_month: '7 ',
      pay_expire_year: '2021',
      redirecturl: 'AjaxLogonForm',
      viewTaskName: 'RedirectView',
    };
    expect(getModifiedPayload(payloadArgs)).toMatchObject(result);
  });
});

describe('#setDefaultPaymentApi', () => {
  it('Should set the particular card for default payment after successfull response', () => {
    const payloadArgs = {
      accountNo: '4444444444444449',
      addressDetails: {
        addressLine1: 'Asdasd',
        addressLine2: 'Asd',
        city: 'Burnwell',
        country: 'US',
        firstName: 'Satyavans',
        lastName: 'Dash',
        phone1: '12345678999',
        state: 'AL',
        zipCode: '35038',
      },
      billingAddressId: 167310,
      ccBrand: 'Visa',
      ccType: 'COMPASSVISA',
      creditCardId: 79069,
      defaultInd: false,
      expMonth: '7 ',
      expYear: '2021',
      nameOnAccount: '.',
    };
    const result = {
      action: 'U',
      addressId: '',
      billing_address1: 'Asdasd',
      billing_address2: 'Asd',
      billing_addressField3: '35038',
      billing_city: 'Burnwell',
      billing_country: 'US',
      billing_firstName: 'Satyavans',
      billing_lastName: 'Dash',
      billing_nickName: 'Billing_10151_1565168308398',
      billing_phone1: '12345678999',
      billing_state: 'AL',
      billing_zipCode: '35038',
      creditCardId: 79069,
      isDefault: 'true',
      isRest: ['true'],
      payMethodId: 'COMPASSVISA',
      pay_account: '4444444444444449',
      pay_expire_month: '7 ',
      pay_expire_year: '2021',
      redirecturl: 'AjaxLogonForm',
      viewTaskName: 'RedirectView',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    setDefaultPaymentApi(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    const payloadArgs = {
      accountNo: '4444444444444449',
      addressDetails: {
        addressLine1: 'Asdasd',
        addressLine2: 'Asd',
        city: 'Burnwell',
        country: 'US',
        firstName: 'Satyavans',
        lastName: 'Dash',
        phone1: '12345678999',
        state: 'AL',
        zipCode: '35038',
      },
      billingAddressId: 167310,
      ccBrand: 'Visa',
      ccType: 'COMPASSVISA',
      creditCardId: 79069,
      defaultInd: false,
      expMonth: '7 ',
      expYear: '2021',
      nameOnAccount: '.',
    };
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    setDefaultPaymentApi(payloadArgs).then(data => {
      expect(data).toEqual('res body is null');
    });
  });
});
