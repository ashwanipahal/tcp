import { executeStatefulAPICall } from '../../handler';

import endpoints from '../../endpoints';
import { getAllCookies } from '../../../utils/cookie.util';

export const getPayloadCookieArray = () => {
  // TODO - Fix this to remove hardcoded values
  return getAllCookies()
    .split(';')
    .map(str => {
      const obj = Object.create(null);
      obj.domain = '.childrensplace.com';
      obj.name = str && str.split('=')[0].trim();
      obj.path = '/';
      obj.secure = false;
      obj.value = str && str.split('=')[1].trim();
      return obj;
    });
};

export const NavigateXHR = () => {
  const payload = {
    body: {
      cookie: getPayloadCookieArray(),
    },
    header: {
      targetDomain: '.gymboree.com',
    },
    webService: endpoints.navigateXHR,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
};

export default { getPayloadCookieArray, NavigateXHR };
