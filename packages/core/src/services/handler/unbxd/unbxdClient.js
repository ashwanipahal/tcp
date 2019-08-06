import superagent from 'superagent';
import { API_CONFIG } from '../../config';
import { isClient } from '../../../utils';

/**
 * @summary This is to generate and return both the request params and the request URL.
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Object} returns derived request object and request url
 */
const getRequestParams = (apiConfig, reqObj) => {
  const {
    sitesInfo: { proto, unbxd },
  } = API_CONFIG;
  const tcpApi = `${proto}${unbxd}${reqObj.url}?${reqObj.queryString}`;
  const requestUrl = tcpApi; // TODO - configure it for Unbxd
  console.log('tcpApi ######## ', tcpApi);
  console.log('requestUrl @@@@@@@@@@ ', requestUrl);
  const reqHeaders = {};
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
const unbxdAPIClient = (apiConfig, reqObj) => {
  console.log('unbxdAPIClient');
  const { requestUrl, reqHeaders } = getRequestParams(apiConfig, reqObj);
  const reqTimeout = API_CONFIG.apiRequestTimeout;
  const requestType = reqObj.webService.method.toLowerCase();
  const request = superagent[requestType](requestUrl)
    .set(reqHeaders)
    .accept(API_CONFIG.apiContentType)
    .timeout(reqTimeout);

  console.log('reqObj', reqObj);
  if (reqObj.header) {
    request.set(reqObj.header);
  }

  // make the api call
  if (requestType === 'get') {
    request.query(reqObj.body);
    // eslint-disable-next-line no-underscore-dangle
    if (request._query && request._query.length > 0) {
      // eslint-disable-next-line no-underscore-dangle
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
        reject(err);
      });
  });
  result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.
  return result;
};

export default unbxdAPIClient;
