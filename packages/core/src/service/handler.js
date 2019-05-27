
import superagent from 'superagent';
import {ServiceError} from '../ServiceError';
import {routingConstants} from 'routing/routingConstants';
import {domainMapping} from 'routing/domainMapping';
import {webServiceSubscriber} from './webServiceSubscriber';
import invariant from 'invariant';
import {isClient} from 'routing/routingHelper';
import { readCookie } from '../../util/cookieManagement';
import { trackError } from '../../util/error-reporter';
import apiCacheManager from './apiCacheManager';
import { config } from '../../util/config/config';

// import {CancelableRequestPromise} from 'util/promise/CancelableRequestPromise.js';

// Redux Form needs this as _error
const GLOBAL_ERROR = '_error';
const ERRORS_MAP = require('./errorMapping.json');

const DEFAULT_PAYLOAD_SEARCH_ROWS_COUNT = '30';

const US_CONFIG_OPTIONS = {
  proto: routingConstants.sitesInfo.proto,
  MELISSA_KEY: routingConstants.MELISSA_KEY,
  storeId: routingConstants.sitesInfo.storeIdUS,
  catalogId: routingConstants.sitesInfo.catalogIdUS,
  isUSStore: true,
  langId: '-1'
};

const CA_CONFIG_OPTIONS = {
  proto: routingConstants.sitesInfo.proto,
  MELISSA_KEY: routingConstants.MELISSA_KEY,
  storeId: routingConstants.sitesInfo.storeIdCA,
  catalogId: routingConstants.sitesInfo.catalogIdCA,
  isUSStore: false,
  langId: '-1'
};

// siteId is a mandatory parameter
export function getApiHelper (siteIdParam, domain, cookie, isMobile) {
  const siteId = siteIdParam.toLowerCase();
  invariant(siteId === routingConstants.siteIds.us || siteId === routingConstants.siteIds.ca,
    `getApiHelper: invalid siteId '${siteId}'`);
  return new ApiHelper(siteId, domain, cookie, isMobile);
}

class ApiHelper {
  constructor (siteId, domain, cookie, isMobile) {
    let basicConfig = siteId === routingConstants.siteIds.us ? US_CONFIG_OPTIONS : CA_CONFIG_OPTIONS;
    let countryKey = siteId === routingConstants.siteIds.us ? '_US' : '_CA';
    const unbxdAPIDomain = '://search.unbxd.io';
    this._configOptions = {
      ...basicConfig,
      siteId: siteId,
      countryKey,
      assetHost: domainMapping[domain] ? domainMapping[domain].assetsHost : domainMapping['default'].assetsHost,
      domain: domainMapping[domain] ? domainMapping[domain].apiDomain : domainMapping['default'].apiDomain,
      unbxd: unbxdAPIDomain,
      apiKeys: domainMapping[domain] ? domainMapping[domain].apiKeys : domainMapping['default'].apiKeys,
      cookie: cookie,
      isMobile: isMobile
    };
  }

  static traceIdCount = 0;

  /**
  @function returns default config options needed for APIs. Currently these are hard
            coded but this should be picked up dynamicaly through some .env f
  */
  get configOptions () {
    return this._configOptions;
  }

  /**
  @function hits a given endpoint appending data. If this is called and the object has not received a token then this function will make the request for a token in parallel
  */
  webServiceCall (obj, useCompleteUrl, incTimeoutObj) {
    let args = obj;
    if (!args.webService) {
      return;
      // throw ({message: 'apiHelper.webServiceCall: You Have Not Supplied A Web Service Object As Part Of The args'});
    }
    // #if MOC_APIS
    // This MOC_API flag is defined in our build scripts, so will always be false unless we are running unit tests
    if (args) return Promise.resolve({ body: require('service/staticServiceAbstractors/json/responseMap').REQUEST_MAP[args.webService.URI] });
    // #endif

    if (process.env.NODE_ENV === 'development') {
      if (isClient()) {
        if (window.localStorage.getItem('devApiType') === 'mock') {
          return getMocDataByUri(args);
        }
      }
    }

    if (args.webService.legacy) {
      return this.legacyServiceCall(args);
    }

    const {
      proto,
      domain,
      unbxd,
      countryKey,
      apiKeys: {
        [`UNBXD_API_KEY${countryKey}`]:
        UNBXD_API_KEY, [`UNBXD_SITE_KEY${countryKey}`]:
        UNBXD_SITE_KEY, UNBXD_API_KEY_CUSTOM } } = this._configOptions;

    const unbxdApiKey = args.webService.unbxdCustom ? UNBXD_API_KEY_CUSTOM : UNBXD_API_KEY;
    const tcpApi = `${proto}${domain}${args.webService.URI}`;
    const unbxdApi = `${proto}${unbxd}/${unbxdApiKey}/${UNBXD_SITE_KEY}/${args.webService.URI}`;

    let requestUrl = args.webService.unbxd ? unbxdApi : tcpApi;
    /*This is a temporaray check until the real API for get all coupons is made available by API team. The URI contains the complete URL of mock service. */
    if(useCompleteUrl) {
      requestUrl = args.webService.URI;
    }

    let reqSetting = {};
    let reqTimeout = config.REQUEST_TIMEOUT;

    if (!args.webService.unbxd) {
      reqSetting = {
        ...reqSetting,
        langId: this.configOptions.langId,
        storeId: this.configOptions.storeId,
        Pragma: 'no-cache',
        Expires: 0,
        catalogId: this.configOptions.catalogId,
        deviceType: this.configOptions.isMobile ? 'mobile' : 'desktop',
        'Cache-Control': 'no-store, must-revalidate',
        'tcp-trace-request-id': this.generateTraceId(),
        'tcp-trace-session-id': this.generateSessionId()
      };
    } else if (args && args.body && !args.body.rows) {
// eslint-disable-next-line no-param-reassign
      //args.body.rows = DEFAULT_PAYLOAD_SEARCH_ROWS_COUNT;
    }
    
    let unbxdUID = readCookie("unbxd.userId");
    if (isClient() && args.webService.unbxd && unbxdUID) {
      args.body = args.body || {};
      args.body['uid'] = unbxdUID;
    }

    const { langId, storeId, categoryId, isMobile } = this.configOptions;
    const cacheArgs = {
      args,
      useCompleteUrl,
      langId,
      storeId,
      categoryId,
      isMobile,
    };
    if (this.configOptions.cookie && !isClient()) {
      reqSetting['Cookie'] = this.configOptions.cookie;
    }
    
    // Extend timeout of addCheckout API to 60 Seconds - DTN-7003
    if(incTimeoutObj) {
      reqTimeout = incTimeoutObj;
    }
    let requestType = args.webService.method.toLowerCase();
    let request = superagent[requestType](requestUrl)
      .set(reqSetting)
      .accept('application/json')
      .timeout(reqTimeout);

    if (args.header) {
      request.set(args.header);
    }

    if (!args.webService.unbxd) {
      request.withCredentials();
    }
    const cachedResult = apiCacheManager.getCachedResult(cacheArgs);
    if (cachedResult) {
      return Promise.resolve(cachedResult);
    }
    // make the api call
    if (requestType === 'get') {
      request.query(args.body);
      if (args.webService.unbxd && request._query && request._query.length > 0) {
        request._query[0] = decodeURIComponent(request._query[0]);
      }
    } else {
      request.send(args.body);
    }
    let result = new Promise((resolve, reject) => {
      request
        .then((response) => {
          resolve(response);
// eslint-disable-next-line prefer-rest-params
          apiCacheManager.setCachedResult(cacheArgs, response);
          webServiceSubscriber.notifyServiceResponse({
            request: {
              body: args.body,
              header: args.header,
              settings: reqSetting
            },
            response: response.body
          }, args.webService.URI);
        })
        .catch((err) => {

          trackError({
            error: err,
            tags: { 
              component: 'ApiHelper',
              endpoint: args.webService.URI,
              'trace-request-id': reqSetting['tcp-trace-request-id'],
              'trace-session-id': reqSetting['tcp-trace-session-id']
            },
            extraData: {
              ...args,
              ...reqSetting
            },
            groupKeys: ['api-error', args.webService.URI]
          });

          reject(err);

          webServiceSubscriber.notifyServiceResponse({
            request: {
              body: args.body,
              header: args.header,
              settings: reqSetting
            },
            response: err.response && err.response.body
          }, args.webService.URI);
        });
    });
    result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.
    return result;
  }

  legacyServiceCall (args) {
    let body = {
      ...args.body,
      catalogId: this.configOptions.catalogId,
      langId: this.configOptions.langId,
      storeId: this.configOptions.storeId
    };

    let requestType = args.webService.method.toLowerCase();
    let request = superagent[requestType](args.webService.URI).accept('application/json');

    if (args.header) {
      request.set(args.header);
    }

    // make the api call
    if (requestType === 'get') {
      request.query(body);
    } else {
      request.send(body);
    }

    let result = new Promise((resolve, reject) => {
      request
        .then((response) => {
          resolve(response);

          webServiceSubscriber.notifyServiceResponse({
            request: {
              body: args ? args.body : {},
              header: args ? args.header : {}
            },
            response: response.body
          }, args.webService.URI);
        })
        .catch((err) => {
          reject(err);

          webServiceSubscriber.notifyServiceResponse({
            request: {
              body: args ? args.body : {},
              header: args ? args.header : {}
            },
            response: err.body
          }, args.webService.URI);
        });
    });
    result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.

    return result;
  }

  /**
   * @function all service abstractors should use this function when in catch() of promise.
   * Backend does not have a normalized way to send errors so this function does the parsing to send it back in a constent way
  */
  //eslint-disable-next-line class-methods-use-this
  getFormattedError (err) {
    return (err.response && err.response.body !== null) ? getFormattedErrorFromResponse(err.response) : err;
  }
  //eslint-disable-next-line class-methods-use-this
  responseContainsErrors (response) {
    // if (response instanceof Error) {
    //   return true;
    // }

    // Be paranoid and make sure that we can handle a situatioin where response.body is undefined
    if (!response || !response.body) {
      return false;
    }
    let responseBody = response.body;
    return !!(responseBody.errorCode || responseBody.errorMessageKey || responseBody.errorKey
      || (responseBody.errors && responseBody.errors.length > 0)
      || (response.body.error && response.body.error.errorCode));
  }

  /**
   * @summary this is meant to generate a new UID on each API call
   */
  // eslint-disable-next-line class-methods-use-this
  generateTraceId () {
    const prefix = isClient() ? 'CLIENT' : 'NODE';
    const timeStamp = (new Date()).valueOf().toString();

    // On the Node Server traceIdCount can grow to Infinity, so we will reset it at 10000
    if (ApiHelper.traceIdCount > 10000) {
      ApiHelper.traceIdCount = 0;
    }

    const traceId = `${prefix}_${ApiHelper.traceIdCount++}_${timeStamp}`;
    return traceId || 'not-found';
  }

  /**
   * @summary this is ONLY used for tieing back logs to a user, this value should not be used for any other application use
   */
  generateSessionId () {
    // Why make one when other have done so for us :-D;
    const sessionCookies = ['QuantumMetricSessionID'];
    let cookie = '';

    for (let index = 0; index < sessionCookies.length; index++) {
      const sessionCookieKey = sessionCookies[index];
      const cookieValue = readCookie(sessionCookieKey, !isClient() ? this.configOptions.cookie : null);

      if (cookieValue) {
        cookie = cookieValue;
        break;
      }
    }
    
    return encodeURIComponent(cookie || 'not-found');
  }

}

function getFormattedErrorFromResponse (response) {
  let errorsList = (Array.isArray(response.body.errors) && response.body.errors)
    || (response.body.error && response.body.error.errorCode && [{
      errorCode: response.body.error.errorCode,
      errorKey: response.body.error.errorKey,
      errorMessageKey: response.body.error.errorMessageKey,
      errorMessage: response.body.error.errorMessage
    }])
    || [{
      errorCode: response.body.errorCode,
      errorKey: response.body.errorKey,
      errorMessageKey: response.body.errorMessageKey,
      errorMessage: response.body.errorMessage
    }];

  let errorCodes = '';
  let errorMessages = {};
  for (let error of errorsList) {
    let errorKey = error.errorKey || error.errorCode || error.errorMessageKey;
    if (ERRORS_MAP[error.errorKey]) {
      errorMessages[ERRORS_MAP[error.errorKey].formFieldName || GLOBAL_ERROR] = populateErrorPlaceholder(ERRORS_MAP[error.errorKey].errorMessage, error);
    } else if (ERRORS_MAP[error.errorCode]) {
      errorMessages[ERRORS_MAP[error.errorCode].formFieldName || GLOBAL_ERROR] = populateErrorPlaceholder(ERRORS_MAP[error.errorCode].errorMessage, error);
    } else if (ERRORS_MAP[error.errorMessageKey]) {
      errorMessages[ERRORS_MAP[error.errorMessageKey].formFieldName || GLOBAL_ERROR] = populateErrorPlaceholder(ERRORS_MAP[error.errorMessageKey].errorMessage, error);
    } else {
      // We send the server error as backup in case we don't have the error in our map, but sometimes backend does not have this either so we default it
      errorMessages[GLOBAL_ERROR] = populateErrorPlaceholder((error.errorMessage || ERRORS_MAP['DEFAULT'].errorMessage), error);
    }
    errorCodes += (errorCodes ? ', ' : '') + errorKey;
  }

  return new ServiceError(errorCodes, errorMessages, response.status, response.misc);
}

/**
 * Replace placeholder(s) in error message with error object keys' values
 * @param {String} errorMsg
 * @param {Object} error
 * @returns {String} Updated error message
 *
 * e.g. populateErrorPlaceholder('Error: Coupon ${couponErr} is expired' , {couponErr: 'XXXX'})
 * output: Error: Coupon XXXX is expired
 */
function populateErrorPlaceholder (errMsg, error) {
  let errorMsg = errMsg;
  //eslint-disable-next-line no-useless-escape
  const regex = /\$\{([^\}]+)\}/g; // regex for pattern ${placeholder}
  const matches = errorMsg.match ? errorMsg.match(regex) : null;
  if (matches) {
    matches.forEach((match) => {
      //eslint-disable-next-line no-useless-escape
      const key = match.replace(/[\$\{\s\}]/g, '');
      errorMsg = errorMsg.replace(match, error[key] || match);
    });
  }

  return errorMsg;
}

export const defaultApiHelper = getApiHelper(routingConstants.siteIds.us, 'default');

// #if !PRODUCTION
// #if !MOC_APIS
function getMocDataByUri (args) {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({ body: require('service/staticServiceAbstractors/json/responseMap').REQUEST_MAP[args.webService.URI] })
      .then((rawJson) => {
        if (isClient()) {
          if (!rawJson.body) {
            window.alert(`Please Create a moc JSON file for ${args.webService.URI}`);
          }
          return import('util/testUtil/editJsonPopup').then((obj) => {
            return obj.editJsonPopup(args.webService.URI, rawJson, args);
          });
        } else {
          return rawJson;
        }
      });
  } else {
    throw new Error('getMocDataByUri: This Should Not Be Running On A Production Application!');
  }
}
// #endif
// #endif
