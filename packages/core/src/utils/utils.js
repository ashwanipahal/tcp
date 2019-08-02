import icons from '../config/icons';
import locators from '../config/locators';
import { getStoreRef, resetStoreRef } from './store.utils';
import { APICONFIG_REDUCER_KEY } from '../constants/reducer.constants';

// setting the apiConfig subtree of whole state in variable; Do we really need it ?
let apiConfig = null;

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

export const isMobileApp = () => {
  return typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
};

export function isClient() {
  return typeof window !== 'undefined' && !isMobileApp();
}

export const isServer = () => {
  return typeof window === 'undefined' && !isMobileApp();
};

/**
 * @summary Get the api config if already created or else creates one.
 * @returns {Object} apiConfig - Api config to be utilized for brand/channel/locale config
 */
export const getAPIConfigForMobile = () => {
  return {
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
};

/**
 * @summary Get the api config if already created or else creates one.
 * @returns {Object} apiConfig - Api config to be utilized for brand/channel/locale config
 */
export const getAPIConfig = () => {
  if (isMobileApp()) return getAPIConfigForMobile();
  // When apiConfig is null (the very first time) or is an empty object, derive value from store..
  const validApiConfigObj = !apiConfig || (apiConfig && !Object.keys(apiConfig).length);
  // This check is to make sure that same instance of apiConfig for different country/brand ssr requests
  const deriveApiConfigObj = validApiConfigObj || isServer();
  if (deriveApiConfigObj) {
    apiConfig = (getStoreRef() && getStoreRef().getState()[APICONFIG_REDUCER_KEY]) || {};
    if (!isServer()) {
      resetStoreRef(); // This is to make module variable reduxStore as null
    }
  }
  return apiConfig;
};

export default {
  getIconPath,
  getLocator,
  isClient,
  isMobileApp,
  isServer,
  getAPIConfig,
};
