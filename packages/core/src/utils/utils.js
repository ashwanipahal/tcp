import icons from '../config/icons';
import locators from '../config/locators';
import flagIcons from '../config/flagIcons';
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
 * This function returns the path of flag icons in static/images/flag folder
 * @param {*} icon | String - Country Code Identifier eg. US for USA
 */
export const getFlagIconPath = code => {
  return flagIcons[code];
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
  const deriveApiConfigObj = validApiConfigObj || !isClient();

  if (deriveApiConfigObj) {
    apiConfig = (getStoreRef() && getStoreRef().getState()[APICONFIG_REDUCER_KEY]) || {};
    if (isClient()) {
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

export const getCacheKeyForRedis = cacheId => {
  const { brandId, siteId, channelId = 'WEB', envId } = getAPIConfig();
  const keySep = '_';
  return `${envId}${keySep}${brandId}${keySep}${siteId}${keySep}${channelId}${keySep}${cacheId}`;
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

export const capitalize = string => {
  return string.replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * @method getPromotionalMessage - this function checks whether the user is PLCC or not and
 *         returns the message respectively
 * @param isPlcc  boolean value for plcc user
 * @param {handlers}  the messages containing both plcc user message and non-plcc user message
 */
export const getPromotionalMessage = (isPlcc, handlers) => {
  if (!!handlers.promotionalPLCCMessage || !!handlers.promotionalMessage) {
    return isPlcc ? handlers.promotionalPLCCMessage : handlers.promotionalMessage;
  }
  return null;
};

export const toTimeString = est => {
  let hh = est.getHours();
  let mm = est.getMinutes();
  const ampm = hh >= 12 ? ' pm' : ' am';
  hh %= 12;
  hh = hh > 0 ? hh : 12;
  mm = mm < 10 ? `0${mm}` : mm;
  if (hh === 11 && mm === 59 && ampm === ' pm') {
    return 'Midnight';
  }
  return `${hh}:${mm}${ampm}`;
};

export const isGymboree = () => {
  const { brandId } = getAPIConfig();
  return brandId === API_CONFIG.brandIds.gym;
};

const GOOGLE_PLACE_PARTS = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  sublocality_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name',
};

const returngetAddress = (addressType, val, address) => {
  const addressRef = { ...address };
  switch (addressType) {
    case 'street_number':
      addressRef.street_number = val;
      break;
    case 'route':
      addressRef.street_name = val;
      break;
    case 'locality':
      addressRef.city = val;
      break;
    case 'sublocality_level_1':
      addressRef.city = val;
      break;
    case 'administrative_area_level_1':
      addressRef.state = val;
      break;
    case 'country':
      addressRef.country = val;
      break;
    case 'postal_code':
      addressRef.zip = val;
      break;
    default:
      addressRef.zip = val;
  }
  return addressRef;
};

export const getAddressFromPlace = (place, inputValue) => {
  let address = {
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    steet_number: '',
    street_name: '',
  };
  if (typeof place.address_components === 'undefined') {
    return address;
  }
  for (let i = 0; i < place.address_components.length; i += 1) {
    const addressType = place.address_components[i].types[0];
    if (GOOGLE_PLACE_PARTS[addressType]) {
      const val = place.address_components[i][GOOGLE_PLACE_PARTS[addressType]];
      address = returngetAddress(addressType, val, address);
    }
  }
  if (!address.street_number) {
    const regex = new RegExp(`^(.*)${address.street_name.split(' ', 1)[0]}`);
    const result = regex.exec(inputValue);
    const inputNum = Array.isArray(result) && result[1] && Number(result[1]);

    if (!Number(inputNum) && parseInt(inputNum, 10) === inputNum) {
      address.street_number = inputNum;
    }
  }

  address.street = `${address.street_number} ${address.street_name}`;

  return address;
};

export const formatAddress = address => ({
  firstName: address.firstName,
  lastName: address.lastName,
  addressLine: [address.address1, address.address2 || ''],
  city: address.city,
  state: address.state,
  country: address.country,
  zipCode: address.zip,
  phone1: address.phoneNumber,
});

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

export const getBirthDateOptionMap = () => {
  const monthOptionsMap = [
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

  const yearOptionsMap = [];
  const dayOptionsMap = [];
  const nowYear = new Date().getFullYear();

  for (let i = 1900; i < nowYear - 17; i += 1) {
    yearOptionsMap.push({ id: i.toString(), displayName: i.toString() });
  }

  for (let i = 1; i < 32; i += 1) {
    if (i <= 9) {
      i = 0 + i;
    }
    dayOptionsMap.push({ id: i.toString(), displayName: i.toString() });
  }

  return {
    daysMap: dayOptionsMap,
    monthsMap: monthOptionsMap,
    yearsMap: yearOptionsMap,
  };
};

/**
 * @function calculateAge
 * @param { string } month
 * @param { string } year
 * This function will calculate the age based on the month and year of birth and will add 'mo' or 'yo' based on age in months or years
 *
 */
export const calculateAge = (month, year) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  let age = currentYear - year;
  if (currentYear.toString() === year && month > currentMonth) {
    return '0 mo';
  }
  if (month > currentMonth && age > 0) {
    age -= 1;
  }
  if (age === 0) {
    if (month > currentMonth) {
      age = `${12 - month + currentMonth} mo`;
    } else {
      age = `${currentMonth - month} mo`;
    }
  } else {
    age += ' yo';
  }
  return age;
};

/**
 *
 * @param {object} labelState object in which key needs to be searched
 * @param {string} labelKey string whose value
 * @param {string} subCategory label subCategory
 * @param {string} category label category
 * This function will return label value if labelKey is present in the object
 * or labelKey itself if its not present in the labelState.
 */
export const getLabelValue = (labelState, labelKey, subCategory, category) => {
  if (typeof labelState !== 'object' || typeof labelKey !== 'string') {
    return ''; // for incorrect params return empty string
  }
  let labelValue = '';

  // if category is passed, then subCategory should also be present for ex. getLabelValue(labels, 'lbl_success_message', 'payment', 'account'), where labels = [reduxStore].Labels
  if (
    category &&
    typeof labelState[category] === 'object' &&
    typeof labelState[category][subCategory] === 'object'
  ) {
    labelValue = labelState[category][subCategory][labelKey];
  } else if (subCategory && typeof labelState[subCategory] === 'object') {
    // in case label object contain category, then only subCategory is needed for ex. get getLabelValue(labels, 'lbl_success_message', 'payment') where labels = [reduxStore].Labels.account
    labelValue = labelState[subCategory][labelKey];
  } else {
    // in case label object contain category & subCategory both, for ex. get getLabelValue(labels, 'lbl_success_message') where labels = [reduxStore].Labels.account.payment
    labelValue = labelState[labelKey];
  }

  return typeof labelValue === 'string' ? labelValue : labelKey;
};

export const generateUniqueKeyUsingLabel = label => {
  return label.replace(/\s/g, '_');
};

export default {
  getPromotionalMessage,
  getIconPath,
  getFlagIconPath,
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
  getAddressFromPlace,
  formatAddress,
  getLabelValue,
  getCacheKeyForRedis,
  calculateAge,
  generateUniqueKeyUsingLabel,
};
