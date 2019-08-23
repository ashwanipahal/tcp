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

/**
 * @see ServerToClientRenderPatch.jsx - Do not use this to determine rendering of a component or part of a component. The server
 *  side and client side hydration should be the same. If this is needed use ServerToClientRenderPatch.jsx.
 */
export function isTouchClient() {
  return typeof window !== 'undefined' && !!('ontouchstart' in window);
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

/**
 * @function resetApiConfig
 * This method resets locally stored api config
 *
 */
export const resetApiConfig = () => {
  apiConfig = null;
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

export const bindAllClassMethodsToThis = (obj, namePrefix = '', isExclude = false) => {
  const prototype = Object.getPrototypeOf(obj);
  // eslint-disable-next-line
  for (let name of Object.getOwnPropertyNames(prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
    const isGetter = descriptor && typeof descriptor.get === 'function';
    // eslint-disable-next-line
    if (isGetter) continue;
    if (
      typeof prototype[name] === 'function' && name !== 'constructor' && isExclude
        ? !name.startsWith(namePrefix)
        : name.startsWith(namePrefix)
    ) {
      // eslint-disable-next-line
      obj[name] = prototype[name].bind(obj);
    }
  }
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
  isCanada,
  bindAllClassMethodsToThis,
  isGymboree,
  isTCP,
};
