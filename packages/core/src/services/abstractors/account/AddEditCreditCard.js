import { executeStatefulAPICall, getAPIConfig } from '../../handler';
import endpoints from '../../endpoints';
import constants from '../../../components/features/account/AddEditCreditCard/container/AddEditCreditCard.constants';

const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw new Error(err.response.body.errors[0].errorMessage);
  }
  throw new Error('Your action could not be completed due to system error');
};

export const addCreditCard = args => {
  const apiConfig = getAPIConfig();
  const payload = {
    webService: endpoints.addCreditCard,
    header: {
      'X-Cookie': apiConfig.cookie,
      isRest: true,
    },
    body: {
      isDefault: args.isDefault ? 'true' : 'false',
      addressId: args.addressId || '',
      billing_firstName: args.firstName,
      billing_lastName: args.lastName,
      billing_phone1: args.phoneNumber || '',
      billing_address1: args.addressLine1,
      billing_address2: args.addressLine2,
      billing_city: args.city,
      billing_state: args.state,
      billing_addressField3: args.zipCode,
      billing_zipCode: args.zipCode,
      billing_country: args.country,
      billing_nickName:
        args.nickName || `Billing_${apiConfig.storeId}_${new Date().getTime().toString()}`,
      pay_account: args.cardNumber,
      pay_expire_month: (args.expMonth || '').toString(), // PLCC does not require expiration
      payMethodId: constants.CREDIT_CARDS_PAYMETHODID[args.cardType],
      pay_expire_year: (args.expYear || '').toString(), // PLCC does not require expiration
      redirecturl: 'AjaxLogonForm',
      viewTaskName: 'RedirectView',
      phone1Publish: args.saveToAccount ? 'false' : 'true',
    },
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      return res.body;
    })
    .catch(errorHandler);
};

export const updateCreditCard = args => {
  const apiConfig = getAPIConfig();
  const payload = {
    webService: endpoints.updateCreditCard,
    header: {
      'X-Cookie': apiConfig.cookie,
      isRest: true,
    },
    body: {
      isDefault: args.isDefault ? 'true' : 'false',
      addressId: args.addressId || '',
      creditCardId: args.creditCardId,
      billing_firstName: args.firstName,
      billing_lastName: args.lastName,
      billing_phone1: args.phoneNumber || '',
      billing_address1: args.addressLine1,
      billing_address2: args.addressLine2,
      billing_city: args.city,
      billing_state: args.state,
      billing_addressField3: args.zipCode,
      billing_zipCode: args.zipCode,
      billing_country: args.country,
      billing_nickName:
        args.nickName || `Billing_${apiConfig.storeId}_${new Date().getTime().toString()}`,
      pay_account: args.cardNumber,
      pay_expire_month: (args.expMonth || '').toString(), // on PLCC it's null
      payMethodId: constants.CREDIT_CARDS_PAYMETHODID[args.cardType],
      pay_expire_year: (args.expYear || '').toString(), // on PLCC it's null
      redirecturl: 'AjaxLogonForm',
      viewTaskName: 'RedirectView',
    },
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      return res.body;
    })
    .catch(errorHandler);
};
