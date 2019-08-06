import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import PAYMENT_CONSTANTS from '../../../components/features/account/Payment/Payment.constants';

export const getModifiedPayload = payload => {
  return {
    action: 'U',
    isDefault: 'true',
    addressId: payload.addressId || '',
    creditCardId: payload.creditCardId,
    billing_firstName: payload.addressDetails.firstName,
    billing_lastName: payload.addressDetails.lastName,
    billing_phone1: payload.addressDetails.phone1 || '',
    billing_address1: payload.addressDetails.addressLine1,
    billing_address2: payload.addressDetails.addressLine2,
    billing_city: payload.addressDetails.city,
    billing_state: payload.addressDetails.state,
    billing_addressField3: payload.addressDetails.zipCode,
    billing_zipCode: payload.addressDetails.zipCode,
    billing_country: payload.addressDetails.country,
    billing_nickName: `Billing_10151_${new Date().getTime().toString()}`,
    pay_account: payload.accountNo,
    pay_expire_month: (payload.expMonth || '').toString(), // on PLCC it's null
    payMethodId: PAYMENT_CONSTANTS.CREDIT_CARDS_PAYMETHODID[payload.ccBrand.toUpperCase()],
    pay_expire_year: (payload.expYear || '').toString(), // on PLCC it's null
    redirecturl: 'AjaxLogonForm',
    viewTaskName: 'RedirectView',
  };
};

export const setDefaultPaymentApi = payload => {
  const payloadData = {
    webService: endpoints.setDefaultPayment,
    header: {
      isRest: true,
    },
    body: getModifiedPayload(payload),
  };

  return executeStatefulAPICall(payloadData).then(res => {
    if (!res) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return res || [];
  });
};
