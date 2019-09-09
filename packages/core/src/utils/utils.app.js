/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import { NavigationActions, StackActions } from 'react-navigation';
import { Dimensions, Linking, Platform, PixelRatio } from 'react-native';
import logger from '@tcp/core/src/utils/loggerInstance';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIConfig } from './utils';

import config from '../components/common/atoms/Anchor/config.native';
import { API_CONFIG } from '../services/config';
import { resetGraphQLClient } from '../services/handler';

let currentAppAPIConfig = null;
let tcpAPIConfig = null;
let gymAPIConfig = null;

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
        resolve(require('../services/handler/graphQL'));
        break;
      default:
        reject();
        break;
    }
  });
};

export const importMoreGraphQLQueries = ({ query, resolve, reject }) => {
  switch (query) {
    case 'moduleX':
      resolve(require('../services/handler/graphQL/queries/moduleX'));
      break;
    case 'moduleA':
      resolve(require('../services/handler/graphQL/queries/moduleA'));
      break;
    case 'moduleN':
      // eslint-disable-next-line global-require
      resolve(require('../services/handler/graphQL/queries/moduleN'));
      break;
    case 'moduleB':
      // eslint-disable-next-line global-require
      resolve(require('../services/handler/graphQL/queries/moduleB'));
      break;
    default:
      reject();
      break;
  }
};

export const importGraphQLQueriesDynamically = query => {
  // TODO - disabling the complexity till we find a better approach for this on Mobile app
  // eslint-disable-next-line complexity
  return new Promise((resolve, reject) => {
    switch (query) {
      case 'footer':
        resolve(require('../services/handler/graphQL/queries/footer'));
        break;
      case 'header':
        resolve(require('../services/handler/graphQL/queries/header'));
        break;
      case 'navigation':
        resolve(require('../services/handler/graphQL/queries/navigation'));
        break;
      case 'layout':
        resolve(require('../services/handler/graphQL/queries/layout'));
        break;
      case 'labels':
        resolve(require('../services/handler/graphQL/queries/labels'));
        break;
      case 'moduleD':
        resolve(require('../services/handler/graphQL/queries/moduleD'));
        break;
      case 'moduleH':
        resolve(require('../services/handler/graphQL/queries/moduleH'));
        break;
      case 'moduleK':
        resolve(require('../services/handler/graphQL/queries/moduleK'));
        break;
      case 'moduleL':
        resolve(require('../services/handler/graphQL/queries/moduleL'));
        break;
      case 'xappConfig':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/xappConfig'));
        break;
      default:
        importMoreGraphQLQueries({ query, resolve, reject });
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
      return navigate('ProductLanding');
    default:
      return null;
  }
};

/**
 * @function: navigateToNestedRoute
 * This method responsible for navigate between different stacks/routes. Now don’t need to make the same routes entry in the multiple stacks
 * @param {Object} _navigation - navigation
 * @param {Object} _stackName - navigation stack
 * @param {Object} _routeName - route name
 * @param {Object} params - params
 */
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
 * @return {number} function returns height of device viewport.
 */
export const getScreenHeight = () => {
  return parseInt(Dimensions.get('screen').height, 10);
};

/**
 * @function cropImageUrl function appends or replaces the cropping value in the URL
 * @param {string} url the image url
 * @param {string} crop the crop parameter
 * @return {string} function returns new Url with the crop value
 */
export const cropImageUrl = (url, crop) => {
  const [urlPath, urlData] = (url && url.split('/upload')) || ['', ''];
  const imgPath = urlPath && urlPath.replace(/^\//, '');
  if (urlPath && crop) {
    return `${imgPath}/upload/${crop}/${urlData.replace(/^\//, '')}`;
  }
  return url;
};

/**
 * @function getValueFromAsyncStorage
 * This method retrieves value for input key from asyncstorage
 * @param key
 *
 * @returns: value from async storage
 */
export const getValueFromAsyncStorage = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    // Error retrieving data
    return null;
  }
};

/**
 * @function setValueInAsyncStorage
 * This method saves the input key and value in asyncstorage
 * @param key: key to be saved
 * @param value: value for key
 *
 */
export const setValueInAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
};

export const validateExternalUrl = url => {
  const isExternal = url.indexOf('http') || url.indexOf('https') !== true;
  if (isExternal === true) {
    return true;
  }
  return false;
};

/**
 * @function resetNavigationStack
 * This function resets data from navigation stack
 *
 */
export const resetNavigationStack = navigation => {
  const { state } = navigation;
  const { routes, index: activeRouteIndex } = state;
  navigation.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: routes[activeRouteIndex].routes[0].routeName }),
      ],
    })
  );
};

/**
 * function getAPIInfoFromEnv
 * @param {*} apiSiteInfo
 * @param {*} envConfig
 * @param {*} appTypeSuffix
 * @returns
 */
const getAPIInfoFromEnv = (apiSiteInfo, envConfig, appTypeSuffix) => {
  const siteIdKey = `RWD_APP_SITE_ID_${appTypeSuffix}`;
  const country = envConfig[siteIdKey] && envConfig[siteIdKey].toUpperCase();
  logger.info(
    'unboxKey',
    `${envConfig[`RWD_APP_UNBXD_SITE_KEY_${country}_EN_${appTypeSuffix}`]}/${
      envConfig[`RWD_APP_UNBXD_SITE_KEY_${country}_EN_${appTypeSuffix}`]
    }`
  );
  const apiEndpoint = envConfig[`RWD_APP_API_DOMAIN_${appTypeSuffix}`] || ''; // TO ensure relative URLs for MS APIs
  return {
    traceIdCount: 0,
    langId: envConfig[`RWD_APP_LANGID_${appTypeSuffix}`] || apiSiteInfo.langId,
    MELISSA_KEY: envConfig[`RWD_APP_MELISSA_KEY_${appTypeSuffix}`] || apiSiteInfo.MELISSA_KEY,
    BV_API_KEY: envConfig[`RWD_APP_BV_API_KEY_${appTypeSuffix}`] || apiSiteInfo.BV_API_KEY,
    assetHost: envConfig[`RWD_APP_ASSETHOST_${appTypeSuffix}`] || apiSiteInfo.assetHost,
    domain: `${apiEndpoint}/${envConfig[`RWD_APP_API_IDENTIFIER_${appTypeSuffix}`]}/`,
    unbxd: envConfig[`RWD_APP_UNBXD_DOMAIN_${appTypeSuffix}`] || apiSiteInfo.unbxd,
    unboxKey: `${envConfig[`RWD_APP_UNBXD_API_KEY_${country}_EN`]}/${
      envConfig[`RWD_APP_UNBXD_SITE_KEY_${country}_EN_${appTypeSuffix}`]
    }`,
    CANDID_API_KEY: envConfig[`RWD_APP_CANDID_API_KEY_${appTypeSuffix}`],
    CANDID_API_URL: envConfig[`RWD_APP_CANDID_URL_${appTypeSuffix}`],
    googleApiKey: envConfig[`RWD_APP_GOOGLE_MAPS_API_KEY_${appTypeSuffix}`],
  };
};

/**
 * getGraphQLApiFromEnv
 *
 * @param {*} apiSiteInfo
 * @param {*} envConfig
 * @param {*} appTypeSuffix
 * @returns
 */
const getGraphQLApiFromEnv = (apiSiteInfo, envConfig, appTypeSuffix) => {
  const graphQlEndpoint = envConfig[`RWD_APP_GRAPHQL_API_ENDPOINT_${appTypeSuffix}`];
  return {
    graphql_reqion: envConfig[`RWD_APP_GRAPHQL_API_REGION_${appTypeSuffix}`],
    graphql_endpoint_url: `${graphQlEndpoint}/${
      envConfig[`RWD_APP_GRAPHQL_API_IDENTIFIER_${appTypeSuffix}`]
    }`,
    graphql_auth_type: envConfig[`RWD_APP_GRAPHQL_API_AUTH_TYPE_${appTypeSuffix}`],
    graphql_api_key: envConfig[`RWD_APP_GRAPHQL_API_KEY_${appTypeSuffix}`] || '',
  };
};

/**
 * function createAPIConfigForApp
 * This method creates and returns api config for input apptype
 * @param {*} envConfig
 * @param {*} appTypeSuffix
 * @returns api config for input app type
 */
export const createAPIConfigForApp = (envConfig, appTypeSuffix) => {
  // TODO - use cookie as well..
  const siteIdKey = `RWD_APP_SITE_ID_${appTypeSuffix}`;
  const brandIdKey = `RWD_APP_BRANDID_${appTypeSuffix}`;
  const isCASite = envConfig[siteIdKey] === API_CONFIG.siteIds.ca;
  const isGYMSite = envConfig[brandIdKey] === API_CONFIG.brandIds.gym;
  const countryConfig = isCASite ? API_CONFIG.CA_CONFIG_OPTIONS : API_CONFIG.US_CONFIG_OPTIONS;
  const brandConfig = isGYMSite ? API_CONFIG.GYM_CONFIG_OPTIONS : API_CONFIG.TCP_CONFIG_OPTIONS;
  const apiSiteInfo = API_CONFIG.sitesInfo;
  const basicConfig = getAPIInfoFromEnv(apiSiteInfo, envConfig, appTypeSuffix);
  const graphQLConfig = getGraphQLApiFromEnv(apiSiteInfo, envConfig, appTypeSuffix);
  const catalogId =
    API_CONFIG.CATALOGID_CONFIG[isGYMSite ? 'Gymboree' : 'TCP'][isCASite ? 'Canada' : 'USA'];

  return {
    ...basicConfig,
    ...graphQLConfig,
    ...countryConfig,
    ...brandConfig,
    isMobile: false,
    cookie: null,
    catalogId,
  };
};

/**
 * getCurrentAPIConfig
 * This method returns current api config
 */
const getCurrentAPIConfig = (envConfig, isTCPBrand) => {
  if (isTCPBrand) {
    // return tcp config
    tcpAPIConfig = tcpAPIConfig || createAPIConfigForApp(envConfig, 'TCP');
    currentAppAPIConfig = tcpAPIConfig;
  } else {
    // return gym config
    gymAPIConfig = gymAPIConfig || createAPIConfigForApp(envConfig, 'GYM');
    currentAppAPIConfig = gymAPIConfig;
  }

  return currentAppAPIConfig;
};

/**
 * createAPIConfig
 * This method returns current api config, creates new if not already created
 */
export const createAPIConfig = (envConfig, appType) => {
  const { RWD_APP_BRANDID_TCP: tcpBrandId } = envConfig;
  const isTCPBrand = appType === tcpBrandId;
  return getCurrentAPIConfig(envConfig, isTCPBrand);
};

/**
 * switchAPIConfig
 * This method switches api config on brand switch in app
 */
export const switchAPIConfig = envConfig => {
  // reset singleton instance of graphql client
  resetGraphQLClient();

  // return second api config stored in local
  const isPrevConfigTCP = currentAppAPIConfig === tcpAPIConfig;
  return getCurrentAPIConfig(envConfig, !isPrevConfigTCP);
};

export const getSiteId = () => {
  const { siteId } = getAPIConfig();
  return siteId;
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

export const isAndroid = () => Platform.OS === 'android';

/**
 * getPixelRatio
 * This method returns the PixelRatio for different devices ( Android & ISO)
 */
export const getPixelRatio = () => {
  // for android iPhone iPhone 6 Plus, 7 Plus, 8 Plus , X, XS, XS Max ,Pixel, Pixel 2 devices. (Note: PixelRatio = 3 ).
  let devicepixel = 'xxhdpi';

  if (PixelRatio.get() === 1) {
    // for android devices mdpi.
    devicepixel = 'mdpi';
    return devicepixel;
  }
  if (PixelRatio.get() === 1.5) {
    // for android devices hdpi
    devicepixel = 'hdpi';
    return devicepixel;
  }
  if (PixelRatio.get() === 2) {
    // for android & iPhone 4, 4S ,iPhone 5, 5C, 5S ,iPhone 6, 7, 8 ,iPhone XR devices .
    devicepixel = 'xhdpi';
    return devicepixel;
  }
  if (PixelRatio.get() > 3.5) {
    // for android devices, Nexus 6 , Samsung7 , Pixel XL, Pixel 2 XL, xxxhdpi Android devices.
    devicepixel = 'xxxhdpi';
    return devicepixel;
  }
  return devicepixel;
};

export default {
  getSiteId,
};
