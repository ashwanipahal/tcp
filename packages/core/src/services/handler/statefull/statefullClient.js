import superagent from 'superagent';
import { STATEFULL_API_REQUEST_TIMEOUT } from '../../config';
import { isClient } from '../../../utils';
import { readCookie } from '../../../utils/cookie.util';

/**
 * @summary this is meant to generate a new UID on each API call
 */
const generateTraceId = apiConfig => {
  const apiConfigObj = apiConfig;
  const prefix = isClient() ? 'CLIENT' : 'NODE';
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
 */
const generateSessionId = apiConfig => {
  const sessionCookies = ['QuantumMetricSessionID'];
  let cookie = '';
  for (let index = 0; index < sessionCookies.length; index += 1) {
    const sessionCookieKey = sessionCookies[index];
    const cookieValue = readCookie(sessionCookieKey, !isClient() ? apiConfig.cookie : null);
    if (cookieValue) {
      cookie = cookieValue;
      break;
    }
  }
  return encodeURIComponent(cookie || 'not-found');
};

const setRequestCookies = (apiConfig, reqSetting) => {
  const reqSettingObj = reqSetting;
  if (apiConfig.cookie && !isClient()) {
    reqSettingObj.Cookie = apiConfig.cookie;
  }
  return reqSettingObj;
};

const deriveRequestParams = (apiConfig, args) => {
  const { proto, domain, catalogId, storeId, langId, isMobile } = apiConfig;

  const deviceType = isMobile ? 'mobile' : 'desktop';

  // TODO: Unbxd API Keys - Custom/Domain Mapping Keys
  const tcpApi = `${proto}${domain}${args.webService.URI}`;
  const requestUrl = tcpApi; // for Unbxd or TCP API

  let reqSetting = {};
  if (!args.webService.unbxd) {
    reqSetting = {
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
  }
  reqSetting = setRequestCookies(apiConfig, reqSetting);
  return {
    requestUrl,
    reqSetting,
  };
};

const webServiceCall = (apiConfig, reqObj) => {
  const args = reqObj;
  if (!args.webService) {
    return null;
  }

  const { requestUrl, reqSetting } = deriveRequestParams(apiConfig, args);
  const reqTimeout = STATEFULL_API_REQUEST_TIMEOUT;
  const requestType = args.webService.method.toLowerCase();
  const request = superagent[requestType](requestUrl)
    .set(reqSetting)
    .accept('application/json')
    .timeout(reqTimeout);

  if (args.header) {
    request.set(args.header);
  }

  if (!args.webService.unbxd) {
    request.withCredentials();
  }

  // make the api call
  if (requestType === 'get') {
    request.query(args.body);
    // eslint-disable-next-line no-underscore-dangle
    if (args.webService.unbxd && request._query && request._query.length > 0) {
      // eslint-disable-next-line no-underscore-dangle
      request._query[0] = decodeURIComponent(request._query[0]);
    }
  } else {
    request.send(args.body);
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

export default webServiceCall;
