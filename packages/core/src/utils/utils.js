import icons from '../config/icons';
import locators from '../config/locators';
import { API_CONFIG } from '../services/config';
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
export const getAPIConfig = () => {
  // When apiConfig is null (the very first time) or is an empty object, derive value from store..
  const validApiConfigObj = !apiConfig || (apiConfig && !Object.keys(apiConfig).length);
  // This check is to make sure that same instance of apiConfig for different country/brand ssr requests
  const deriveApiConfigObj = validApiConfigObj;

  if (deriveApiConfigObj) {
    apiConfig = (getStoreRef() && getStoreRef().getState()[APICONFIG_REDUCER_KEY]) || {};

    if (!isServer() && !isMobileApp()) {
      resetStoreRef(); // This is to make module variable reduxStore as null
    }
  }

  return apiConfig;
};

export const getBrand = () => {
  return getAPIConfig().brandId;
};

export const isTCP = () => {
  const { brandId } = getAPIConfig();
  return brandId === API_CONFIG.brandIds.tcp;
};

export const isCanada = () => {
  const { siteId } = getAPIConfig();
  return siteId === API_CONFIG.siteIds.ca;
};

export const isGymboree = () => {
  const { brandId } = getAPIConfig();
  return brandId === API_CONFIG.brandIds.gym;
};

export default {
  getIconPath,
  getLocator,
  getBrand,
  isClient,
  isMobileApp,
  isServer,
  getAPIConfig,
  isGymboree,
  isTCP,
  isCanada,
};
