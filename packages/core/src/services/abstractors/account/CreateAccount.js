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
      response: 'no_response::false:false',
      xCreditCardId: '',
      zipCode: payload.noCountryZip,
      catalogId: apiConfig.catalogId,
      langId: apiConfig.langId,
      storeId: apiConfig.storeId,
    },
  };
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
