import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getAPIConfig } from '../../../utils';

const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw new Error(err.response.body.errors[0].errorMessage);
  }
  throw new Error('Your action could not be completed due to system error!!!!');
};

export const deleteAddressApi = payload => {
  const apiConfig = getAPIConfig();
  const payloadData = {
    webService: endpoints.deleteAddress,
    header: {
      nickName: payload.nickName,
    },
    body: {
      langId: apiConfig.langId,
      catalogId: apiConfig.catalogId,
      storeId: apiConfig.storeId,
    },
  };
  return executeStatefulAPICall(payloadData)
    .then(res => {
      return res;
    })
    .catch(errorHandler);
};

export default {
  deleteAddressApi,
};
