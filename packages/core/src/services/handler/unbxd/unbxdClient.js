import superagent from 'superagent';
import { STATEFUL_API_REQUEST_TIMEOUT } from '../../config';
import { isClient } from '../../../utils';

/**
 * @summary This is to set the request params and generate the request URL.
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Object} returns derived request object and request url
 */
const getRequestParams = (apiConfig, reqObj) => {
  const { proto, domain } = apiConfig;
  const tcpApi = `${proto}${domain}${reqObj.webService.URI}`;
  const requestUrl = tcpApi; // TODO - for Unbxd or TCP API
  const reqSetting = {};
  if (apiConfig.cookie && !isClient()) {
    reqSetting.Cookie = apiConfig.cookie;
  }
  return {
    requestUrl,
    reqSetting,
  };
};

/**
 * @summary This is to initialise superagent client to consume the unbxd data.
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Promise} Resolves with promise to consume the unbxd api or reject in case of error
 */
const unbxdAPICall = (apiConfig, reqObj) => {
  const { requestUrl, reqSetting } = getRequestParams(apiConfig, reqObj);
  const reqTimeout = STATEFUL_API_REQUEST_TIMEOUT;
  const requestType = reqObj.webService.method.toLowerCase();
  const request = superagent[requestType](requestUrl)
    .set(reqSetting)
    .accept('application/json')
    .timeout(reqTimeout);

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

export default unbxdAPICall;
