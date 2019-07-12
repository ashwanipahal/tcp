import { executeWebServiceCall } from '../../../handler';
import endpoints from '../../../endpoints';
import CHECKOUT_PAGE from '../../../../constants/pages.constants';

export function getAddressListData() {
  const payload = {
    webService: endpoints.getAddressList,
    header: {
      fromPage: CHECKOUT_PAGE,
    },
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
