import endpoints from '../../endpoints';
import { getAllCookies } from '../../../utils/cookie.util';
import { getAPIConfig } from '../../../utils';
import { executeExternalAPICall } from '../../handler';

export const getPayloadCookieArray = () => {
  // TODO - Fix this to remove hardcoded values
  return getAllCookies()
    .split(';')
    .map(str => {
      const obj = Object.create(null);

      obj.name = str && str.split('=')[0].trim();
      obj.path = '/';
      obj.value = str && str.split('=')[1].trim();
      return obj;
    });
};

export const NavigateXHR = () => {
  const { brandId } = getAPIConfig();
  const crossDomain =
    brandId === 'gym' ? 'https://test5.thechildrensplace.com' : 'https://test6.gymboree.com';
  endpoints.navigateXHR.URI = `${crossDomain}/api/${endpoints.navigateXHR.URI}`;

  const payload = {
    body: {
      cookie: getPayloadCookieArray(),
    },
    webService: endpoints.navigateXHR,
  };

  return executeExternalAPICall(payload)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
};

export default { getPayloadCookieArray, NavigateXHR };
