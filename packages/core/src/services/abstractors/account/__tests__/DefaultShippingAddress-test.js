import { defaultShippingAddressApi } from '../DefaultShippingAddress';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#defaultShippingAddressApi', () => {
  const payloadArgs = {
    addressLine: ['3241 Halladay St', '', ''],
    addressType: 'ShippingAndBilling',
    attributes: [{ key: 'addressField2', value: '2' }, { key: 'addressField3', value: '92705' }],
    catalogId: '10551',
    city: 'Santa Ana',
    country: 'US',
    firstName: 'sdfds',
    langId: '-1',
    lastName: 'dfsd',
    nickName: 'sb_2019-08-07 03:31:00.694',
    phone1: '2345678999',
    phone1Publish: false,
    primary: 'true',
    state: 'CA',
    storeId: '10151',
    xcont_addressField3: '92705',
    xcont_pageName: 'myAccount',
    zipCode: '92705',
  };
  it('Should set the shipping address as default shipping address', () => {
    const result = {
      addressId: '167317',
      nickName: 'sb_2019-08-07 03:31:00.694',
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    defaultShippingAddressApi(payloadArgs).then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    defaultShippingAddressApi(payloadArgs).then(data => {
      expect(data).toEqual('res body is null');
    });
  });
});
