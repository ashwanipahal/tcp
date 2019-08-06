import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const defaultShippingAddressApi = payload => {
  const payloadData = {
    webService: endpoints.setDefaultShippingAddress,
    payload: {
      payload,
      nickName: payload.nickName,
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
  defaultShippingAddressApi,
};
