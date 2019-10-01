import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import PAGES from '../../../constants/pages.constants';
import { parseBoolean } from '../../../utils/utils';

export function formatAddressBookResponse(arr) {
  let containsDefault = false;
  const addresses = arr.map(address => {
    containsDefault = containsDefault || parseBoolean(address.primary);
    return {
      ...address,
    };
  });

  // if no default, flag the first one as default
  if (!containsDefault && addresses.length) {
    addresses[0].primary = 'true';
  }
  return addresses;
}

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
    return formatAddressBookResponse(res.body.contact || []);
  });
};

export default {
  getAddressListData,
};
