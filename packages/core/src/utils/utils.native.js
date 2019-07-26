import { Dimensions, Linking } from 'react-native';
import icons from '../config/icons';
import locators from '../config/locators';

export const importGraphQLClientDynamically = module => {
  return new Promise((resolve, reject) => {
    switch (module) {
      case 'graphQL':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL'));
        break;
      default:
        reject();
        break;
    }
  });
};

export const importGraphQLQueriesDynamically = query => {
  return new Promise((resolve, reject) => {
    switch (query) {
      case 'footer':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/footer'));
        break;
      case 'header':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/header'));
        break;
      case 'layout':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/layout'));
        break;
      case 'labels':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/labels'));
        break;
      case 'moduleD':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/moduleD'));
        break;
      case 'moduleH':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/moduleH'));
        break;
      case 'moduleK':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/moduleK'));
        break;
      default:
        reject();
        break;
    }
  });
};

const discSmall = require('../assets/discover-small.png');
const masterCard = require('../assets/mastercard-small.png');
const amexCard = require('../assets/amex-small.png');
const visaSmall = require('../assets/visa-small.png');
const placeCard = require('../assets/TCP-CC-small.png');
const giftCardSmall = require('../assets/TCP-gift-small.png');
const venmoCard = require('../assets/venmo-small.png');

export const getIconCard = icon => {
  switch (icon) {
    case 'disc-small':
      return discSmall;
    case 'mc-small':
      return masterCard;
    case 'amex-small':
      return amexCard;
    case 'visa-small':
      return visaSmall;
    case 'gift-card-small':
      return giftCardSmall;
    case 'place-card-small':
      return placeCard;
    case 'venmo-blue-acceptance-mark':
      return venmoCard;
    default:
      return visaSmall;
  }
};

export const UrlHandler = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

/**
 * @function getScreenWidth function returns screen width.
 * @return {number} function returns width of device vieport.
 */
export const getScreenWidth = () => {
  return parseInt(Dimensions.get('screen').width, 10);
};

/**
 * @function getScreenHeight function returns screen height.
 * @return {number} function returns width of device viewport.
 */
export const getScreenHeight = () => {
  return parseInt(Dimensions.get('screen').height, 10);
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

/**
 * @function cropImageUrl function appends or replaces the cropping value in the URL
 * @param {string} url the image url
 * @param {string} crop the crop parameter
 * @return {string} function returns new Url with the crop value
 */
export const cropImageUrl = (url, crop) => {
  const [urlPath, urlData] = url.split('/upload');
  return `${urlPath}/upload/${crop}/${urlData.replace(/^\//, '')}`;
};
