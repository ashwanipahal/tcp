import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getAPIConfig } from '../../../utils';

export const defaultShippingAddressApi = payload => {
  const apiConfig = getAPIConfig();
  const payloadData = {
    webService: endpoints.setDefaultShippingAddress,
    header: {
      nickName: payload.nickName,
    },
    body: {
      ...payload,
      langId: apiConfig.langId,
      catalogId: apiConfig.catalogId,
      storeId: apiConfig.storeId,
    },
  };
  return executeStatefulAPICall(payloadData)
    .then(res => {
      if (!res) {
        throw new Error('res body is null');
        // TODO - Set API Helper to filter if error exists in response
      }
      return res;
    })
    .catch(err => {
      throw new Error(err);
    });
};

export default {
  defaultShippingAddressApi,
};
