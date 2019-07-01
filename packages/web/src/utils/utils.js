import locators from '../config/locators';
import icons from '../config/icons';

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

/**
 * This function identifies current brand either TCP or GYMBOREE
 */
export const identifyBrand = () => {
  const url = 'http://www.thechildrensplace.com/';

  return url.indexOf('thechildrensplace') > -1 ? 'tcp' : 'gymboree';
};

export default {
  getIconPath,
  getLocator,
  identifyBrand,
};
