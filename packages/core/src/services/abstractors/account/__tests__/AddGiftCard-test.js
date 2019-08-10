import { getCardListApi, addGiftCardApi } from '../AddGiftCard';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#getCardListApi', () => {
  it('Should get all the card details in the Payment & GC section', () => {
    const result = {
      creditCardListJson: [
        {
          accountNo: '***************2444',
          billingAddressId: null,
          addressDetails: null,
          ccBrand: 'GC',
          ccType: 'GiftCard',
          creditCardId: 79028,
          defaultInd: false,
          expMonth: '11',
          expYear: '2037',
          nameOnAccount: '.',
          properties: null,
        },
        {
          accountNo: '***************2445',
          billingAddressId: null,
          addressDetails: null,
          ccBrand: 'GC',
          ccType: 'GiftCard',
          creditCardId: 79030,
          defaultInd: false,
          expMonth: '11',
          expYear: '2037',
          nameOnAccount: '.',
          properties: null,
        },
        {
          accountNo: '************0106',
          billingAddressId: 167310,
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
          ccBrand: 'MC',
          ccType: 'COMPASSMASTERCARD',
          creditCardId: 74597,
          defaultInd: true,
          expMonth: '4 ',
          expYear: '2027',
          nameOnAccount: '.',
          properties: null,
        },
        {
          accountNo: '************4449',
          billingAddressId: 167310,
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
          ccBrand: 'Visa',
          ccType: 'COMPASSVISA',
          creditCardId: 79069,
          defaultInd: false,
          expMonth: '7 ',
          expYear: '2021',
          nameOnAccount: '.',
          properties: null,
        },
        {
          accountNo: '***************2447',
          billingAddressId: null,
          addressDetails: null,
          ccBrand: 'GC',
          ccType: 'GiftCard',
          creditCardId: 79071,
          defaultInd: false,
          expMonth: '11',
          expYear: '2037',
          nameOnAccount: '.',
          properties: null,
        },
      ],
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    getCardListApi().then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {
      body: {
        errors: [
          {
            errorMessage: 'Test Error Messages',
          },
        ],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    getCardListApi().then(data => {
      expect(data).toEqual('Test Error Messages');
    });
  });

  it('Should throw errors in case of unable to connect to server', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    getCardListApi().then(data => {
      expect(data).toEqual('Your action could not be completed due to system error');
    });
  });
});

describe('#addGiftCardApi', () => {
  it('should add gift card and give success response', () => {
    const payloadArgs = {
      cardPin: '3456',
      giftCardNumber: '1231312312312312447',
      recaptchaToken: 'test',
    };

    const result = {
      account_pin: '3456',
      addressId: '',
      balance: 0,
      cc_brand: 'GC',
      creditCardId: '79071',
      isRest: ['true'],
      payMethodId: 'GiftCard',
      pay_account: '1231312312312312447',
      pay_expire_month: '11',
      pay_expire_year: '2037',
      recapchaResponse:
        '03AOLTBLQfKvwI8u1PlLeEi-BrSlLaCemUk9IfhiOosHedRAABUNCsH6CuDKW6SYQOUdxGsFh0e7z6JruQCeZchJKv0701hG3JWVxh2mM9jpKfPf-pkfttZUZth-InURAqwYe4pwmB5dzDm56ytEumaqWUz2QpsnHVznVPDMtoNHpt_VNF0He3bwwiwyyBy5d8UorzE5yQoxn4tu99HG-_v2ZCevi-cGLB-jxPe6Q4ur8H_gK6Dj1Nu74VCqLnPaRVDJ5TNYV687C-Og7iNVyJRjjj5qLiTQskwYtW9E0e2UQnHko6PElw4pk6y_dfo4mvEfJHJNgoaFlx',
      redirecturl: 'AjaxLogonForm',
      remoteAddress: '10.56.28.62',
      tcpTraceRequestId: 'CLIENT_1_1565166231379, CLIENT_1_1565166231379',
      tcpTraceSessionId: '3fba4014bfcb75fba120091f798a4f58, 3fba4014bfcb75fba120091f798a4f58',
      trueClientIp: '125.16.91.5, 125.16.91.5',
      viewTaskName: 'RedirectView',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    addGiftCardApi(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    const payloadArgs = {
      cardPin: '3456',
      giftCardNumber: '1231312312312312447',
      recaptchaToken: 'test',
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
    addGiftCardApi(payloadArgs).then(data => {
      expect(data).toEqual('Test Error Message');
    });
  });

  it('Should throw errors in case of unable to connect to server', () => {
    const payloadArgs = {
      cardPin: '3456',
      giftCardNumber: '1231312312312312447',
      recaptchaToken: 'test2',
    };
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    addGiftCardApi(payloadArgs).then(data => {
      expect(data).toEqual('Your action could not be completed due to system error');
    });
  });
});
