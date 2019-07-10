import { executeWebServiceCall } from '../../../handler';
import endpoints from '../../../endpoints';

export function getAddressListData() {
  const payload = {
    webService: endpoints.getAddressList,
  };
  return executeWebServiceCall(payload).then(res => {
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return res.body.contact || [];
  });
}

export default {
  getAddressListData,
};
