// eslint-disable-next-line import/no-unresolved
import Router from 'next/router';
import { ENV_PRODUCTION, ENV_DEVELOPMENT } from '../constants/env.config';
import icons from '../config/icons';
import locators from '../config/locators';
import { API_CONFIG } from '../services/config';
import { getStoreRef, resetStoreRef } from './store.utils';
import { APICONFIG_REDUCER_KEY } from '../constants/reducer.constants';

// setting the apiConfig subtree of whole state in variable; Do we really need it ?
let apiConfig = null;

export const isMobileApp = () => {
  return typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
};

export const isServer = () => {
  return typeof window === 'undefined' && !isMobileApp();
};

/**
 * @summary Creates the API config object based on the response local variables set by node server
 * @param {Object} resLocals  response object of Node server
 * @returns {Object} generated api config object

 */
export const createAPIConfig = resLocals => {
  // TODO - Get data from env config - Brand, MellisaKey, BritverifyId, AcquisitionId, Domains, Asset Host, Unbxd Domain;
  // TODO - use isMobile and cookie as well..
  // TODO - Keep a fallback in case of any error in state/store reference

  const { siteId, brandId } = resLocals;
  const isCASite = siteId === API_CONFIG.siteIds.ca;
  const isGYMSite = brandId === API_CONFIG.brandIds.gym;
  const countryConfig = isCASite ? API_CONFIG.CA_CONFIG_OPTIONS : API_CONFIG.US_CONFIG_OPTIONS;
  const brandConfig = isGYMSite ? API_CONFIG.GYM_CONFIG_OPTIONS : API_CONFIG.TCP_CONFIG_OPTIONS;
  const basicConfig = API_CONFIG.sitesInfo;
  return {
    ...basicConfig,
    ...countryConfig,
    ...brandConfig,
    isMobile: false,
    cookie: null,
  };
};

/**
 * @summary Get the api config if already created or else creates one.
 * @returns {Object} apiConfig - Api config to be utilized for brand/channel/locale config
 */
export const getAPIConfig = () => {
  // When apiConfig is null (the very first time) or is an empty object, derive value from store..
  const validApiConfigObj = !apiConfig || (apiConfig && !Object.keys(apiConfig).length);
  // This check is to make sure that same instance of apiConfig for different country/brand ssr requests
  const deriveApiConfigObj = validApiConfigObj || isServer();
  if (isMobileApp()) {
    // TODO - need to configure it for mobile app in similar way of Web - Overriding it for now
    apiConfig = {
      brandId: 'tcp',
      brandIdCMS: 'TCP',
      traceIdCount: 0,
      proto: 'https',
      MELISSA_KEY: '63987687',
      BV_API_KEY: 'e50ab0a9-ac0b-436b-9932-2a74b9486436',
      storeId: '10151',
      catalogId: '10551',
      isUSStore: true,
      langId: '-1',
      siteId: 'us',
      countryKey: '_US',
      assetHost: 'https://test4.childrensplace.com',
      domain: '://test4.childrensplace.com/api/',
      unbxd: '://search.unbxd.io',
      cookie: null,
      isMobile: false,
    };
  } else if (deriveApiConfigObj) {
    apiConfig = getStoreRef().getState()[APICONFIG_REDUCER_KEY];
    if (!isServer()) {
      resetStoreRef(); // This is to make module variable reduxStore as null
    }
  }
  return apiConfig;
};

export const importGraphQLClientDynamically = module => {
  return import(`../services/handler/${module}`);
};

export const importGraphQLQueriesDynamically = query => {
  return import(`../services/handler/graphQL/queries/${query}`);
};

export function isClient() {
  return typeof window !== 'undefined' && !isMobileApp();
}

export const isProduction = () => {
  return process.env.NODE_ENV === ENV_PRODUCTION;
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === ENV_DEVELOPMENT;
};

export const getSiteId = () => {
  const { siteId } = getAPIConfig();
  return siteId;
};

export const routerPush = (href, as) => {
  const siteId = getSiteId();
  return Router.push(href, `/${siteId}${as}`);
};

export const identifyBrand = () => {
  const url = 'http://www.thechildrensplace.com/';

  return url.indexOf('thechildrensplace') > -1 ? 'tcp' : 'gymboree';
};

/**
 * This common function works for finding key in an object.
 * Please refer Account.jsx in core/src/components/features/account/Account/Account.jsx
 */
export const getObjectValue = (obj, defaultVal, ...params) => {
  if (!obj) return defaultVal;

  let objRef = obj;
  const paramsLen = params.length;
  for (let i = 0; i < paramsLen; i += 1) {
    if (objRef[params[i]]) {
      objRef = objRef[params[i]];
    } else {
      objRef = null;
      break;
    }
  }
  return objRef || defaultVal;
};

export const createUrlSearchParams = (query = {}) => {
  const queryParams = [];
  const keys = Object.keys(query);
  for (let i = 0, l = keys.length; i < l; i += 1) {
    queryParams.push(`${keys[i]}=${query[keys[i]]}`);
  }
  return queryParams.join('&');
};

export const buildUrl = options => {
  if (typeof options === 'object') {
    const { pathname, query } = options;
    let url = pathname;
    if (typeof query === 'object') {
      url += `?${createUrlSearchParams(query)}`;
    }
    return url;
  }
  return options;
};

/**
 * This function returns the path of icons in static/images folder
 * @param {*} icon | String - Identifier for icons in assets
 */
export const getIconPath = icon => {
  return icons[icon];
};

/**
 * This function returns the path of icons in static/images folder
 * @param {*} icon | String - Identifier for icons in assets
 */
export const getLocator = locator => {
  return locators[locator];
};

export const getIconCard = icon => {
  switch (icon) {
    case 'disc-small':
      return icons.dicoveryCard;
    case 'mc-small':
      return icons.masterCard;
    case 'amex-small':
      return icons.amexCard;
    case 'visa-small':
      return icons.visaSmall;
    case 'gift-card-small':
      return icons.giftCardSmall;
    case 'place-card-small':
      return icons.plccCard;
    case 'venmo-blue-acceptance-mark':
      return icons.venmoCard;
    default:
      return icons.visaSmall;
  }
};

export default {
  importGraphQLClientDynamically,
  importGraphQLQueriesDynamically,
  isProduction,
  isDevelopment,
  identifyBrand,
  getObjectValue,
  getIconPath,
  getLocator,
  createUrlSearchParams,
  buildUrl,
  getSiteId,
  routerPush,
};
