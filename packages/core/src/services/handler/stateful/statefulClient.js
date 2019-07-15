import superagent from 'superagent';
import { API_CONFIG } from '../../config';
import { isClient, isMobileApp } from '../../../utils';
import { readCookie } from '../../../utils/cookie.util';

/**
 * @summary this is meant to generate a new UID on each API call
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @returns {string} returns generated traceId of User or else not-found string value

 */
const generateTraceId = apiConfig => {
  const apiConfigObj = apiConfig;
  let prefix;

  // Setting prefix of trace-id based on platform of user i.e. either mobile, browser, Node
  if (isMobileApp()) {
    prefix = 'MOBILE';
  } else if (isClient()) {
    prefix = 'CLIENT';
  } else {
    prefix = 'NODE';
  }
  const timeStamp = new Date().valueOf().toString();

  // On the Node Server traceIdCount can grow to Infinity, so we will reset it at 10000
  if (apiConfigObj.traceIdCount > 10000) {
    apiConfigObj.traceIdCount = 0;
  }

  const traceIdCount = apiConfigObj.traceIdCount + 1;
  const traceId = `${prefix}_${traceIdCount}_${timeStamp}`;
  return traceId || 'not-found';
};

/**
 * @summary this is ONLY used for tieing back logs to a user, this value should not be used for any other application use
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @returns {string} returns derived QuantumMetricSessionID from cookie or else not-found string value
 */
const generateSessionId = apiConfig => {
  const { sessionCookieKey } = API_CONFIG;
  // TODO - Check if it works in Mobile app as well or else change it to isServer check
  const cookieValue = readCookie(sessionCookieKey, !isClient() ? apiConfig.cookie : null);
  return encodeURIComponent(cookieValue || 'not-found');
};

/**
 * @summary This is to generate and return both the request params and the request URL.
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Object} returns derived request object and request url
 */
const getRequestParams = (apiConfig, reqObj) => {
  const { proto, domain, catalogId, storeId, langId, isMobile } = apiConfig;
  const deviceType = isMobile ? 'mobile' : 'desktop';
  const requestUrl = `${proto}${domain}${reqObj.webService.URI}`;
  const reqHeaders = {
    langId,
    storeId,
    Pragma: 'no-cache',
    Expires: 0,
    catalogId,
    deviceType,
    'Cache-Control': 'no-store, must-revalidate',
    'tcp-trace-request-id': generateTraceId(apiConfig),
    'tcp-trace-session-id': generateSessionId(apiConfig),
  };
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
 * @summary This is to initialise superagent client to consume the stateful data.
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Promise} Resolves with promise to consume the stateful api or reject in case of error
 */
const statefulAPIClient = (apiConfig, reqObj) => {
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
  request.withCredentials();
  if (requestType === 'get') {
    request.query(reqObj.body);
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

export default statefulAPIClient;
