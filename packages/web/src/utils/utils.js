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

export const objectToQueryString = params => {
  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
};

export default {
  getIconPath,
  getLocator,
};
