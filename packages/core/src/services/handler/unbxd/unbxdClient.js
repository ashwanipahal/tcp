/* eslint-disable no-underscore-dangle */
import superagent from 'superagent';
import { readCookie } from '../../../utils/cookie.util';
import { API_CONFIG } from '../../config';
import { isClient, isMobileApp, getBrand } from '../../../utils';

const modifyUnbxdUrl = unboxKey => {
  const temp = unboxKey.split('/');
  temp.splice(0, 1, 'sites');
  return temp.join('/');
};
/**
 * @summary This is to generate and return both the request params and the request URL.
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Object} returns derived request object and request url
 */
const getRequestParams = (apiConfig, reqObj) => {
  const {
    webService: { URI, unbxdCustom, authHeaderRequired },
  } = reqObj;
  let { brand } = reqObj;
  let reqHeaders;
  if (!brand) {
    const brandID = getBrand();
    brand = brandID && brandID.toUpperCase();
  }
  const brandUnboxKey = apiConfig[`unboxKey${brand}`];
  const unboxKey = unbxdCustom ? modifyUnbxdUrl(brandUnboxKey) : brandUnboxKey;
  const unbxdKey = apiConfig[`unbxd${brand}`];
  const requestUrl = `${unbxdKey}/${unboxKey}/${URI}`;
  const unbxdAPIKey = apiConfig[`unbxdApiKey${brand}`];

  if (authHeaderRequired) {
    reqHeaders = {
      Authorization: unbxdAPIKey,
    };
  } else {
    reqHeaders = {};
  }
  // TODO - Check if it works in Mobile app as well or else change it to isServer check
  if (apiConfig.cookie && !isClient()) {
    reqHeaders.Cookie = apiConfig.cookie;
  }
  return {
    requestUrl,
    reqHeaders,
  };
};

/**
 * @summary This is to initialise superagent client to consume the unbxd data.
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Promise} Resolves with promise to consume the unbxd api or reject in case of error
 */
const UnbxdAPIClient = (apiConfig, reqObj) => {
  const { requestUrl, reqHeaders } = getRequestParams(apiConfig, reqObj);
  const reqTimeout = API_CONFIG.apiRequestTimeout;
  const requestType = reqObj.webService.method.toLowerCase();
  const request = superagent[requestType](requestUrl)
    .set(reqHeaders)
    .accept(API_CONFIG.apiContentType)
    .timeout(reqTimeout);

  if (reqObj.header) {
    request.set(reqObj.header);
  }

  // make the api call
  if (requestType === 'get') {
    const unbxdUID = !isMobileApp() ? readCookie('unbxd.userId', document && document.cookie) : '';
    if (isClient() && unbxdUID) {
      // eslint-disable-next-line
      reqObj.body.uid = unbxdUID;
    } else {
      // eslint-disable-next-line
      // reqObj.body.uid = 'uid-1563946353348-89276';
    }

    // decode params in body if already encoded in mobile app
    request.query(reqObj.body);

    if (request._query && request._query.length > 0) {
      request._query[0] = decodeURIComponent(request._query[0]);
    }
  } else {
    request.send(reqObj.body);
  }

  const result = new Promise((resolve, reject) => {
    request
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ err, reqObj, reqHeaders });
      });
  });
  result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.
  return result;
};

export default UnbxdAPIClient;
