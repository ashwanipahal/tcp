import icons from '../config/icons';
import locators from '../config/locators';

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

export default {
  getIconPath,
  getLocator,
  isClient,
  isMobileApp,
  isServer,
};
