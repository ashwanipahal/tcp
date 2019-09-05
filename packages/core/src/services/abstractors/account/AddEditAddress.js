import { executeStatefulAPICall } from '../../handler';
import { getAPIConfig } from '../../../utils';
import endpoints from '../../endpoints';

const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw new Error(err.response.body.errors[0].errorMessage);
  }
  throw new Error('Your action could not be completed due to system error');
};

export const addAddress = args => {
  const apiConfig = getAPIConfig();
  const addressKey = Date.now().toString();
  const payload = {
    webService: endpoints.addAddress,
    header: {
      'X-Cookie': apiConfig.cookie,
      isRest: true,
    },
    body: {
      contact: [
        {
          addressLine: [args.address1, args.address2, ''],
          attributes: [
            {
              key: 'addressField3',
              value: args.zip || args.zipCode,
            },
          ],
          addressType: 'ShippingAndBilling',
          city: args.city,
          country: args.country,
          firstName: args.firstName,
          lastName: args.lastName,
          nickName: addressKey,
          phone1: args.phoneNumber,
          phone1Publish: args.phone1Publish || 'false',
          phone2: args.alternatePhoneNumber,
          primary: args.primary,
          state: args.state,
          zipCode: args.zip || args.zipCode,
          xcont_addressField2: args.isCommercialAddress ? '2' : '1',
          email1: args.email || args.emailAddress,
          xcont_addressField3: args.zip || args.zipCode,
          fromPage: args.fromPage || '',
        },
      ],
    },
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      return res;
    })
    .catch(errorHandler);
};

export const updateAddress = args => {
  const apiConfig = getAPIConfig();

  let body = {
    addressLine: [args.address1, args.address2, ''],
    attributes: [
      {
        key: 'addressField3',
        value: args.zip,
      },
    ],
    addressType: 'ShippingAndBilling',
    city: args.city,
    country: args.country,
    firstName: args.firstName,
    lastName: args.lastName,
    phone1: args.phoneNumber,
    phone1Publish: args.saveToAccount || 'false',
    primary: args.primary,
    state: args.state,
    zipCode: args.zip,
    xcont_addressField2: args.isCommercialAddress ? '2' : '1',
    email1: args.email,
    xcont_addressField3: args.zip,
    fromPage: args.applyToOrder ? 'checkout' : '',
  };

  if (args.addressId) {
    body = {
      addressId: args.addressId,
      fromPage: 'checkout',
    };
  }

  const payload = {
    webService: endpoints.updateAddress,
    header: {
      'X-Cookie': apiConfig.cookie,
      isRest: true,
      nickName: args.nickName,
    },
    body,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      return res;
    })
    .catch(errorHandler);
};
