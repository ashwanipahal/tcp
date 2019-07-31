import { Dimensions, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import icons from '../config/icons';
import locators from '../config/locators';
import { getStoreRef, resetStoreRef } from './store.utils';
import { APICONFIG_REDUCER_KEY } from '../constants/reducer.constants';

import config from '../components/common/atoms/Anchor/config.native';

// setting the apiConfig subtree of whole state in variable; Do we really need it ?
let apiConfig = null;

export const isMobileApp = () => {
  return typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
};

export const isServer = () => {
  return typeof window === 'undefined' && !isMobileApp();
};

export function isClient() {
  return typeof window !== 'undefined' && !isMobileApp();
}

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
      case 'navigation':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/navigation'));
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
      case 'moduleL':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/moduleL'));
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
 * @param {url} string
 * @returns {type} string
 */
const getLandingPage = url => {
  const { URL_PATTERN } = config;
  if (url.includes(URL_PATTERN.PRODUCT_LIST)) {
    return URL_PATTERN.PRODUCT_LIST;
  }
  if (url.includes(URL_PATTERN.CATEGORY_LANDING)) {
    return URL_PATTERN.CATEGORY_LANDING;
  }
  return null;
};

/**
 * @param {string} url
 * @param {function} navigation
 * Returns navigation to the parsed URL based on  the url param
 */
export const navigateToPage = (url, navigation) => {
  const { URL_PATTERN } = config;
  const { navigate } = navigation;
  const category = getLandingPage(url);
  const text = url.split('/');
  const title = text[text.length - 1].replace(/[\W_]+/g, ' ');
  switch (category) {
    case URL_PATTERN.PRODUCT_LIST:
      /**
       * /p/Rainbow--The-Birthday-Girl--Graphic-Tee-2098277-10
       * If url starts with “/p” → Create and navigate to a page in stack for Products (Blank page with a Text - “Product List”)
       */
      return navigate('ProductLanding', { product: title });
    case URL_PATTERN.CATEGORY_LANDING:
      /**
       * /c/* - If url starts with “/c” (* can be anything in url) → Select “CATEGORY_LANDING” tab in tabbar and Open CATEGORY_LANDING page
       */
      return navigate('NavMenuLevel1');
    default:
      return null;
  }
};

export const navigateToNestedRoute = (_navigation, _stackName, _routeName, params) => {
  return (
    _navigation &&
    _navigation.dispatch(
      NavigationActions.navigate({
        routeName: _stackName,
        action: NavigationActions.navigate({
          routeName: _routeName,
          params,
        }),
      })
    )
  );
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
  const [urlPath, urlData] = (url && url.split('/upload')) || ['', ''];
  if (urlPath && crop) {
    return `${urlPath}/upload/${crop}/${urlData.replace(/^\//, '')}`;
  }
  return url;
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
    apiConfig = (getStoreRef() && getStoreRef().getState()[APICONFIG_REDUCER_KEY]) || {};
    if (!isServer()) {
      resetStoreRef(); // This is to make module variable reduxStore as null
    }
  }
  return apiConfig;
};
