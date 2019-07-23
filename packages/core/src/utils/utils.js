import { ENV_PRODUCTION, ENV_DEVELOPMENT } from '../constants/env.config';
import icons from '../config/icons';
import locators from '../config/locators';

const MONTH_SHORT_FORMAT = {
  JAN: 'Jan',
  FEB: 'Feb',
  MAR: 'Mar',
  APR: 'Apr',
  MAY: 'May',
  JUN: 'Jun',
  JUL: 'Jul',
  AUG: 'Aug',
  SEP: 'Sep',
  OCT: 'Oct',
  NOV: 'Nov',
  DEC: 'Dec',
};

export const importGraphQLClientDynamically = module => {
  return import(`../services/handler/${module}`);
};

export const importGraphQLQueriesDynamically = query => {
  return import(`../services/handler/graphQL/queries/${query}`);
};

export const isMobileApp = () => {
  return typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
};

export const isServer = () => {
  return typeof window === 'undefined' && !isMobileApp();
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

export const getCreditCardExpirationOptionMap = () => {
  const expMonthOptionsMap = [
    { id: '', displayName: 'MMM' },
    { id: '1', displayName: MONTH_SHORT_FORMAT.JAN },
    { id: '2', displayName: MONTH_SHORT_FORMAT.FEB },
    { id: '3', displayName: MONTH_SHORT_FORMAT.MAR },
    { id: '4', displayName: MONTH_SHORT_FORMAT.APR },
    { id: '5', displayName: MONTH_SHORT_FORMAT.MAY },
    { id: '6', displayName: MONTH_SHORT_FORMAT.JUN },
    { id: '7', displayName: MONTH_SHORT_FORMAT.JUL },
    { id: '8', displayName: MONTH_SHORT_FORMAT.AUG },
    { id: '9', displayName: MONTH_SHORT_FORMAT.SEP },
    { id: '10', displayName: MONTH_SHORT_FORMAT.OCT },
    { id: '11', displayName: MONTH_SHORT_FORMAT.NOV },
    { id: '12', displayName: MONTH_SHORT_FORMAT.DEC },
  ];

  const expYearOptionsMap = [];
  const nowYear = new Date().getFullYear();
  expYearOptionsMap.push({
    id: '',
    displayName: 'YYYY',
  });
  for (let i = nowYear; i < nowYear + 11; i += 1) {
    expYearOptionsMap.push({ id: i.toString(), displayName: i.toString() });
  }

  return {
    monthsMap: expMonthOptionsMap,
    yearsMap: expYearOptionsMap,
  };
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
  getCreditCardExpirationOptionMap,
};
