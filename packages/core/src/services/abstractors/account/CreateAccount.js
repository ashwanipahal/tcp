import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const createAccountApi = payload => {
  const payloadData = {
    webService: endpoints.createAccount,
    payload: {
      catalogId: '10551',
      firstName: payload.firstName,
      langId: '-1',
      lastName: payload.lastName,
      logonId: payload.emailAddress,
      logonPassword: payload.password,
      phone1: payload.phoneNumber,
      rememberCheck: payload.rememberMe || false,
      rememberMe: payload.rememberMe || false,
      response: 'no_response::false:false',
      storeId: '10151',
      userId: '-1002',
      xCreditCardId: '',
      zipCode: payload.noCountryZip,
    },
  };
  return executeStatefulAPICall(payloadData).then(res => {
    if (!res) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return res || [];
  });
};

export default {
  createAccountApi,
};
