// eslint-disable-next-line import/no-unresolved
import Router from 'next/router';
import { ENV_PRODUCTION, ENV_DEVELOPMENT } from '../constants/env.config';
import icons from '../config/icons';
import { breakpoints } from '../../styles/themes/TCP/mediaQuery';
import { getAPIConfig } from './utils';

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

export const isProduction = () => {
  return process.env.NODE_ENV === ENV_PRODUCTION;
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === ENV_DEVELOPMENT;
};

export const getSiteId = () => {
  const { siteId } = getAPIConfig();
  return siteId;
};

export const routerPush = (href, as) => {
  const siteId = getSiteId();
  return Router.push(href, `/${siteId}${as}`);
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
  for (let i = nowYear; i < nowYear + 11; i += 1) {
    expYearOptionsMap.push({ id: i.toString(), displayName: i.toString() });
  }

  return {
    monthsMap: expMonthOptionsMap,
    yearsMap: expYearOptionsMap,
  };
};

/**
 * Calculates browser width and height, and informs the current viewport as per the defined viewport settings
 */
export const getViewportInfo = () => {
  if (!window) return null;

  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const isMobile = width < parseInt(breakpoints.medium, 10);
  const isTablet = !isMobile && width < parseInt(breakpoints.large, 10);
  const isDesktop = !isMobile && !isTablet;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
  };
};

/**
 * Show Dark Overlay in background
 */
export const showOverlay = () => {
  const className = 'dark-overlay';
  if (typeof window !== 'undefined' && document.getElementsByClassName(className)[0]) {
    document.getElementsByClassName(className)[0].style.display = 'block';
  }
};

/**
 * Remove Dark Overlay from background
 */
export const closeOverlay = () => {
  const className = 'dark-overlay';
  if (typeof window !== 'undefined' && document.getElementsByClassName(className)[0]) {
    document.getElementsByClassName(className)[0].style.display = 'none';
  }
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

export default {
  importGraphQLClientDynamically,
  importGraphQLQueriesDynamically,
  isProduction,
  isDevelopment,
  identifyBrand,
  getObjectValue,
  createUrlSearchParams,
  buildUrl,
  getCreditCardExpirationOptionMap,
  getSiteId,
  routerPush,
  bindAllClassMethodsToThis,
};
