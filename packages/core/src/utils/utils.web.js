/* eslint-disable max-lines */
// eslint-disable-next-line import/no-unresolved
import Router from 'next/router';
import { ENV_PRODUCTION, ENV_DEVELOPMENT } from '../constants/env.config';
import icons from '../config/icons';
import { breakpoints, mediaQuery } from '../../styles/themes/TCP/mediaQuery';
import { getAPIConfig, isClient } from './utils';
import { API_CONFIG } from '../services/config';
import { defaultCountries, defaultCurrencies } from '../constants/site.constants';
import { readCookie, setCookie } from './cookie.util';
import { ROUTING_MAP, ROUTE_PATH } from '../config/route.config';

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

const FIXED_HEADER = {
  LG_HEADER: 70,
  SM_HEADER: 60,
};

export const importGraphQLClientDynamically = module => {
  return import(`../services/handler/${module}`);
};

export const importGraphQLQueriesDynamically = query => {
  return import(`../services/handler/graphQL/queries/${query}`);
};

export const getLocationOrigin = () => {
  return window.location.origin;
};

export const canUseDOM = () => {
  return typeof window !== 'undefined' && window.document && window.document.createElement;
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

const isCompleteHTTPUrl = url => /^(http|https):\/\//.test(url);

const getRouteHref = noSlugPath => {
  const pathArray = noSlugPath ? noSlugPath.replace(/\//, '&').split('&') : ['', ROUTING_MAP.home];
  const pathValue = pathArray[1];
  return ROUTING_MAP[pathValue] || ROUTING_MAP.home;
};

/**
 * @summary This is to return the Page (inside of Pages folder) which is mapped to the route path
 * for ex: /home will return /index file name.
 * @param {String || Object} toPath - list of color options
 * @returns {String || Object} Mapped actual page href path
 */
export const getMappedPageHref = (toPath = '') => {
  if (typeof toPath === 'string') {
    if (isCompleteHTTPUrl(toPath)) return toPath;
    const [noSlugPath = '/', query = ''] = toPath.split('?');
    const mappedToHref = getRouteHref(noSlugPath);
    return query ? `${mappedToHref}?${query}` : mappedToHref;
  }
  const { pathname = '', query } = toPath;
  if (isCompleteHTTPUrl(pathname)) return pathname;
  const mappedToHref = getRouteHref(pathname);
  return {
    pathname: mappedToHref,
    query,
  };
};

/**
 * @summary This is to return the asPath with additional slug values appended
 * @param {String} as - asPath
 * @param {String} siteId - siteId dynamic value to be appended
 * @returns {String} Path with slug value appended
 */
export const getAsPathWithSlug = (as, siteId = getSiteId()) => {
  return isCompleteHTTPUrl(as) ? as : `/${siteId}${as}`;
};

export const routerPush = (href, as, query, siteId = getSiteId()) => {
  const relHref = getMappedPageHref(href);
  const asPath = getAsPathWithSlug(as, siteId);
  return Router.push(relHref, asPath, { query });
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
 * Enable Body Scroll
 */
export const enableBodyScroll = () => {
  if (typeof window !== 'undefined') {
    const [body] = document.getElementsByTagName('body');
    body.style.overflow = 'auto';
  }
};

/**
 * Disable Body Scroll
 */
export const disableBodyScroll = () => {
  if (typeof window !== 'undefined') {
    const [body] = document.getElementsByTagName('body');
    body.style.overflow = 'hidden';
  }
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

export const scrollPage = (x = 0, y = 0) => {
  if (window) {
    window.scrollTo(x, y);
  }
};

export const scrollTopElement = elem => {
  if (window) {
    document.getElementById(elem).scrollTop = 0;
  }
};

export const getCountriesMap = data => {
  const countries = defaultCountries;
  data.map(value =>
    countries.push(
      Object.assign({}, value.country, {
        siteId: 'us',
        currencyId: value.currency.id,
      })
    )
  );
  return countries;
};

export const getCurrenciesMap = data => {
  const currencies = defaultCurrencies;
  data.map(value => currencies.push(Object.assign({}, value.currency, value.exchangeRate)));
  return currencies.filter(
    (currency, index, self) => index === self.findIndex(cur => cur.id === currency.id)
  );
};

export const siteRedirect = (newCountry, oldCountry, newSiteId, oldSiteId) => {
  if ((newCountry && newCountry !== oldCountry) || (newSiteId && newSiteId !== oldSiteId)) {
    routerPush(window.location.href, ROUTE_PATH.home, null, newSiteId);
  }
};

export const languageRedirect = (newLanguage, oldLanguage) => {
  if (newLanguage && newLanguage !== oldLanguage) {
    const { protocol, host, pathname } = window.location;
    if (newLanguage === 'fr' && host.indexOf('fr.') === -1) {
      const href = `${protocol}//fr.${host}${pathname}`;
      window.location = href;
    } else if (newLanguage === 'es' && host.indexOf('es.') === -1) {
      const href = `${protocol}//es.${host}${pathname}`;
      window.location = href;
    }
  }
};

/*
 *
 * @param {object} event the HTML element's element
 * @param {number} key key for which the event needs to be triggered
 * @param {function} method method passed which is to be invoked.
 * @description this method invokes the parameter method received when respective
 * keybord key is triggered
 */
export const handleGenericKeyDown = (event, key, method) => {
  if (event.keyCode === key) {
    method();
  }
};
const getAPIInfoFromEnv = (apiSiteInfo, processEnv, siteId) => {
  const country = siteId && siteId.toUpperCase();
  const apiEndpoint = processEnv.RWD_WEB_API_DOMAIN || ''; // TO ensure relative URLs for MS APIs
  const unbxdApiKey = processEnv[`RWD_WEB_UNBXD_API_KEY_${country}_EN`];
  return {
    traceIdCount: 0,
    langId: processEnv.RWD_WEB_LANGID || apiSiteInfo.langId,
    MELISSA_KEY: processEnv.RWD_WEB_MELISSA_KEY || apiSiteInfo.MELISSA_KEY,
    BV_API_KEY: processEnv.RWD_WEB_BV_API_KEY || apiSiteInfo.BV_API_KEY,
    assetHost: processEnv.RWD_WEB_DAM_HOST || apiSiteInfo.assetHost,
    productAssetPath: processEnv.PWD_WEB_DAM_PRODUCT_IMAGE_PATH,
    domain: `${apiEndpoint}/${processEnv.RWD_WEB_API_IDENTIFIER}/`,
    unbxd: processEnv.RWD_WEB_UNBXD_DOMAIN || apiSiteInfo.unbxd,
    fbkey: processEnv.RWD_WEB_FACEBOOKKEY,
    instakey: processEnv.RWD_WEB_INSTAGRAM,
    unboxKey: `${unbxdApiKey}/${processEnv[`RWD_WEB_UNBXD_SITE_KEY_${country}_EN`]}`,
    unbxdApiKey,
    envId: processEnv.RWD_WEB_ENV_ID,
    previewEnvId: processEnv.RWD_WEB_STG_ENV_ID,
    BAZAARVOICE_SPOTLIGHT: processEnv.RWD_WEB_BAZAARVOICE_API_KEY,
    BAZAARVOICE_REVIEWS: processEnv.RWD_WEB_BAZAARVOICE_PRODUCT_REVIEWS_API_KEY,
    CANDID_API_KEY: process.env.RWD_WEB_CANDID_API_KEY,
    CANDID_API_URL: process.env.RWD_WEB_CANDID_URL,
    googleApiKey: process.env.RWD_WEB_GOOGLE_MAPS_API_KEY,
    ACQUISITION_ID: process.env.RWD_WEB_ACQUISITION_ID,
    raygunApiKey: processEnv.RWD_WEB_RAYGUN_API_KEY,
    channelId: API_CONFIG.channelIds.Desktop, // TODO - Make it dynamic for all 3 platforms
    borderFree: processEnv.BORDERS_FREE,
    borderFreeComm: processEnv.BORDERS_FREE_COMM,
    paypalEnv: processEnv.RWD_WEB_PAYPAL_ENV,
    crossDomain: processEnv.RWD_WEB_CROSS_DOMAIN,
  };
};
const getGraphQLApiFromEnv = (apiSiteInfo, processEnv, relHostname) => {
  const graphQlEndpoint = processEnv.RWD_WEB_GRAPHQL_API_ENDPOINT || relHostname;
  return {
    graphql_reqion: processEnv.RWD_WEB_GRAPHQL_API_REGION,
    graphql_endpoint_url: `${graphQlEndpoint}/${processEnv.RWD_WEB_GRAPHQL_API_IDENTIFIER}`,
    graphql_auth_type: processEnv.RWD_WEB_GRAPHQL_API_AUTH_TYPE,
    graphql_api_key: processEnv.RWD_WEB_GRAPHQL_API_KEY || '',
  };
};
/*
 * @method numericStringToBool
 * @description this method returns the bool value of string numeric passed
 * @param {string} str the  string numeric value
 */
export const numericStringToBool = str => !!+str;
// Parse boolean out of string true|false
export const parseBoolean = bool => {
  return bool === true || bool === '1' || (bool || '').toUpperCase() === 'TRUE';
};
/**
 *
 * @param {object} bossDisabledFlags carries the boss disability flags -
 * bossCategoryDisabled,
 * bossProductDisabled
 * @returns the disability boolean value
 */
export const isBossProduct = bossDisabledFlags => {
  const { bossCategoryDisabled, bossProductDisabled } = bossDisabledFlags;
  return !(numericStringToBool(bossCategoryDisabled) || numericStringToBool(bossProductDisabled));
};
/**
 * @function isBopsProduct
 * @param {*} isUSStore
 * @param {*} product
 * @summary This BOPIS logic is to validate if product/color variant is eligible for BOPIS
 * product is a color variant object of a product.
 */
export const isBopisProduct = (isUSStore, product) => {
  let isOnlineOnly;
  if (isUSStore) {
    isOnlineOnly =
      (product.TCPWebOnlyFlagUSStore && parseBoolean(product.TCPWebOnlyFlagUSStore)) || false;
  } else {
    isOnlineOnly =
      (product.TCPWebOnlyFlagCanadaStore && parseBoolean(product.TCPWebOnlyFlagCanadaStore)) ||
      false;
  }
  return !isOnlineOnly;
};
export const createAPIConfig = resLocals => {
  // TODO - Get data from env config - Brand, MellisaKey, BritverifyId, AcquisitionId, Domains, Asset Host, Unbxd Domain;
  // TODO - use isMobile and cookie as well..

  const { country, currency, language, siteId, brandId, hostname } = resLocals;
  const isCASite = siteId === API_CONFIG.siteIds.ca;
  const isGYMSite = brandId === API_CONFIG.brandIds.gym;
  const countryConfig = isCASite ? API_CONFIG.CA_CONFIG_OPTIONS : API_CONFIG.US_CONFIG_OPTIONS;
  const brandConfig = isGYMSite ? API_CONFIG.GYM_CONFIG_OPTIONS : API_CONFIG.TCP_CONFIG_OPTIONS;
  const catalogId =
    API_CONFIG.CATALOGID_CONFIG[isGYMSite ? 'Gymboree' : 'TCP'][isCASite ? 'Canada' : 'USA'];
  const apiSiteInfo = API_CONFIG.sitesInfo;
  const processEnv = process.env;
  const relHostname = apiSiteInfo.proto + apiSiteInfo.protoSeparator + hostname;
  const basicConfig = getAPIInfoFromEnv(apiSiteInfo, processEnv, siteId);
  const graphQLConfig = getGraphQLApiFromEnv(apiSiteInfo, processEnv, relHostname);
  return {
    ...basicConfig,
    ...graphQLConfig,
    ...countryConfig,
    ...brandConfig,
    catalogId,
    isMobile: false,
    cookie: null,
    country,
    currency,
    language,
  };
};

export const routeToStoreDetails = (storeDetail, refresh = false) => {
  const {
    basicInfo: {
      id,
      storeName,
      address: { city, state, zipCode },
    },
  } = storeDetail;
  const storeParams = `${storeName
    .replace(/\s/g, '')
    .toLowerCase()}-${state.toLowerCase()}-${city
    .replace(/\s/g, '')
    .toLowerCase()}-${zipCode}-${id}`;
  const url = `/store/${storeParams}`;
  let routerHandler = null;
  if (isClient())
    routerHandler = () =>
      routerPush(refresh ? window.location.href : `/store?storeStr=${storeParams}`, url);
  return {
    routerHandler,
    url,
    storeParams,
  };
};

/**
 * Returns data stored in localstorage
 * @param {string} key - Localstorage item key
 * @returns {string} - Localstorage item data
 */
export const getLocalStorage = key =>
  isClient ? window.localStorage.getItem(key) : readCookie(key);

/**
 * Set key/value data to localstorage
 * @param {Object} arg - Key/Value paired data to be set in localstorage
 */
export const setLocalStorage = arg => {
  const { key, value } = arg;
  return isClient() ? window.localStorage.setItem(key, value) : setCookie(arg);
};

export const viewport = () => {
  if (!window) return null;

  return {
    small: window.matchMedia(mediaQuery.smallOnly).matches,
    medium: window.matchMedia(mediaQuery.mediumOnly).matches,
    large: window.matchMedia(mediaQuery.large).matches,
  };
};

export const fetchStoreIdFromUrlPath = url => {
  const currentStoreUrl = url || document.location.href;
  const pathSplit = currentStoreUrl.split('-');
  return pathSplit[pathSplit.length - 1];
};

export const getModifiedLanguageCode = id => {
  switch (id) {
    case 'en':
      return 'en_US';
    case 'es':
      return 'es_ES';
    case 'fr':
      return 'fr_FR';
    default:
      return id;
  }
};

/**
 * @method getTranslateDateInformation
 * @desc returns day, month and day of the respective date provided
 * @param {string} date date which is to be mutated
 * @param {upperCase} locale use for convert locate formate
 */
export const getTranslateDateInformation = (
  date,
  language,
  dayOption = {
    weekday: 'short',
  },
  monthOption = {
    month: 'short',
  }
) => {
  const localeType = language ? getModifiedLanguageCode(language).replace('_', '-') : 'en';
  const currentDate = date ? new Date(date) : new Date();
  return {
    day: new Intl.DateTimeFormat(localeType, dayOption).format(currentDate),
    month: new Intl.DateTimeFormat(localeType, monthOption).format(currentDate),
    date: currentDate.getDate(),
    year: currentDate.getFullYear(),
  };
};

export const scrollToParticularElement = element => {
  const fixedHeaderOffset = getViewportInfo().isDesktop
    ? FIXED_HEADER.LG_HEADER
    : FIXED_HEADER.SM_HEADER;
  if (isClient()) {
    const elementPositionFromTop = element.getBoundingClientRect().top;
    const calculatedOffset = elementPositionFromTop - fixedHeaderOffset;
    window.scrollTo({
      top: calculatedOffset,
      behavior: 'smooth',
    });
  }
};

export default {
  importGraphQLClientDynamically,
  importGraphQLQueriesDynamically,
  isProduction,
  isDevelopment,
  getObjectValue,
  createUrlSearchParams,
  buildUrl,
  getCreditCardExpirationOptionMap,
  getSiteId,
  routerPush,
  bindAllClassMethodsToThis,
  scrollPage,
  scrollTopElement,
  getCountriesMap,
  getCurrenciesMap,
  siteRedirect,
  languageRedirect,
  handleGenericKeyDown,
  getLocalStorage,
  setLocalStorage,
  viewport,
  fetchStoreIdFromUrlPath,
  canUseDOM,
  getModifiedLanguageCode,
  getTranslateDateInformation,
  scrollToParticularElement,
};
