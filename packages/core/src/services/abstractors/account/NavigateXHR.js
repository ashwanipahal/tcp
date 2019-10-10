import endpoints from '../../endpoints';
import { getAllCookies } from '../../../utils/cookie.util';
import { getAPIConfig } from '../../../utils';
// import { executeExternalAPICall } from '../../handler';

export const getPayloadCookieArray = () => {
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
  const { crossDomain } = getAPIConfig();
  const webServiceEndPoints = Object.assign({}, endpoints.navigateXHR);
  webServiceEndPoints.URI = `${crossDomain}/api/${endpoints.navigateXHR.URI}`;

  return fetch(webServiceEndPoints.URI, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      cookie: getPayloadCookieArray(),
    }),
  })
    .then(response => {
      return response;
    })
    .catch(err => {
      throw err;
    });
};

export default { getPayloadCookieArray, NavigateXHR };
