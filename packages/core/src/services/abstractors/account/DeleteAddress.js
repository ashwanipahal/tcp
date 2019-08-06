import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const deleteAddressApi = payload => {
  const payloadData = {
    webService: endpoints.deleteCreditCardOnAccount,
    payload,
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
  deleteAddressApi,
};
