import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import PAGES from '../../../constants/pages.constants';

export const getAddressListData = () => {
  const payload = {
    webService: endpoints.getAddressList,
    header: {
      fromPage: PAGES.CHECKOUT_PAGE,
    },
  };
  return executeStatefulAPICall(payload).then(res => {
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return res.body.contact || [];
  });
};

export default {
  getAddressListData,
};
