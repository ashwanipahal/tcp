import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getAPIConfig } from '../../../utils';

export const createAccountApi = payload => {
  const apiConfig = getAPIConfig();
  const payloadData = {
    webService: endpoints.createAccount,
    body: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      logonId: payload.emailAddress,
      logonPassword: payload.password,
      phone1: payload.phoneNumber,
      rememberCheck: payload.rememberMe || false,
      rememberMe: payload.rememberMe || false,
      response: payload.emailValidationStatus,
      xCreditCardId: '',
      zipCode: payload.noCountryZip || payload.zipCode,
      catalogId: apiConfig.catalogId,
      langId: apiConfig.langId,
      storeId: apiConfig.storeId,
    },
  };
  if (payload.userId) {
    payloadData.body.userId = payload.userId;
  }
  return executeStatefulAPICall(payloadData)
    .then(res => {
      if (!res) {
        throw new Error('res body is null');
      }
      return res;
    })
    .catch(err => {
      throw err;
    });
};

export default { createAccountApi };
