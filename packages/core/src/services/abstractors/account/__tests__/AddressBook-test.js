import { getAddressListData } from '../AddressBook';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#getAddressListData', () => {
  it('Should get all the list of the addresses', () => {
    const result = {
      addressId: '161811',
      contact: [
        {
          addressId: '167310',
          addressLine: ['Asdasd', 'Asd', ''],
          addressType: 'ShippingAndBilling',
          attributes: [
            {
              key: 'addressField2',
              value: '1',
            },
            {
              key: 'addressField3',
              value: '35038',
            },
          ],
          city: 'Burnwell',
          country: 'US',
          email1: 'SATYAVAN.DASH23@GMAIL.COM',
          firstName: 'Satyavans',
          lastName: 'Dash',
          nickName: 'sb_2019-07-26 02:30:48.116',
          phone1: '12345678999',
          phone1Publish: 'false',
          primary: 'true',
          state: 'AL',
          xcont_isBillingAddress: 'true',
          xcont_isDefaultBilling: 'true',
          xcont_isShippingAddress: 'true',
          zipCode: '35038',
        },
        {
          addressId: '167304',
          addressLine: ['3241 Halladay St', '', ''],
          addressType: 'ShippingAndBilling',
          attributes: [
            {
              key: 'addressField2',
              value: '2',
            },
            {
              key: 'addressField3',
              value: '92705',
            },
          ],
          city: 'Santa Ana',
          country: 'US',
          firstName: 'sdfds',
          lastName: 'dfsd',
          nickName: 'sb_2019-08-07 03:31:00.694',
          phone1: '2345678999',
          phone1Publish: 'false',
          primary: 'false',
          state: 'CA',
          xcont_isBillingAddress: 'false',
          xcont_isShippingAddress: 'true',
          zipCode: '92705',
        },
        {
          addressId: '167309',
          addressLine: ['3241 Halladay St', '', ''],
          addressType: 'ShippingAndBilling',
          attributes: [
            {
              key: 'addressField2',
              value: '2',
            },
            {
              key: 'addressField3',
              value: '92705',
            },
          ],
          city: 'Santa Ana',
          country: 'US',
          email1: 'SATYAVAN.DASH@GMAIL.COM',
          firstName: 'sdfds',
          lastName: 'dfsd',
          nickName: 'sb_2019-08-07 03:31:12.754',
          phone1: '2345678999',
          phone1Publish: 'false',
          primary: 'false',
          state: 'CA',
          xcont_isBillingAddress: 'false',
          xcont_isShippingAddress: 'true',
          zipCode: '92705',
        },
        {
          addressId: '167307',
          addressLine: ['3241 South Halladay Street', '', ''],
          addressType: 'ShippingAndBilling',
          attributes: [
            {
              key: 'addressField2',
              value: '1',
            },
            {
              key: 'addressField3',
              value: '92705',
            },
          ],
          city: 'Alaska',
          country: 'US',
          email1: 'SATYAVAN.DASH23@GMAIL.COM',
          firstName: 'sdfds',
          lastName: 'dfsd',
          nickName: 'sb_2019-08-07 03:34:05.8',
          phone1: '2345678999',
          phone1Publish: 'false',
          primary: 'false',
          state: 'CA',
          xcont_isBillingAddress: 'false',
          xcont_isShippingAddress: 'true',
          zipCode: '92705',
        },
      ],
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    getAddressListData().then(data => {
      expect(data).toMatchObject(result);
    });
  });

  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    getAddressListData().then(data => {
      expect(data).toEqual('res body is null');
    });
  });
});
