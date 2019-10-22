import endpoints from '../../endpoints';
import { getAllCookies } from '../../../utils/cookie.util';
import { getAPIConfig, isMobileApp } from '../../../utils';

export const getPayloadCookieArray = cookie => {
  const checkMobileApp = isMobileApp();
  const informationCookies =
    checkMobileApp && cookie ? Object.entries(cookie) : getAllCookies().split(';');
  return informationCookies.map(str => {
    const obj = Object.create(null);
    if (!checkMobileApp) {
      obj.name = str && str.split('=')[0].trim();
      obj.path = '/';
      obj.value = str && str.split('=')[1].trim();
    } else {
      obj.name = str && str[0].trim();
      obj.path = '/';
      obj.value = str && str[1].trim();
    }

    return obj;
  });
};

export const NavigateXHR = cookie => {
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
    body: JSON.stringify({ cookie: getPayloadCookieArray(cookie) }),
  })
    .then(response => {
      return response;
    })
    .catch(err => {
      throw err;
    });
};

export default { getPayloadCookieArray, NavigateXHR };
