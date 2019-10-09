/* eslint-disable max-lines */
import icons from '../config/icons';
import locators from '../config/locators';
import flagIcons from '../config/flagIcons';
import { API_CONFIG } from '../services/config';
import { getStoreRef, resetStoreRef } from './store.utils';
import { APICONFIG_REDUCER_KEY } from '../constants/reducer.constants';
import { parseDate } from './parseDate';
import { ROUTE_PATH } from '../config/route.config';

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

export const toTimeString = (est, perfect = false) => {
  let hh = est.getHours();
  let mm = est.getMinutes();
  const ampm = hh >= 12 ? ' pm' : ' am';
  hh %= 12;
  hh = hh > 0 ? hh : 12;
  mm = mm < 10 ? `0${mm}` : mm;
  if (hh === 11 && mm === 59 && ampm === ' pm') {
    return 'Midnight';
  }
  return !perfect ? `${hh}:${mm}${ampm}` : `${hh}${ampm}`;
};

/**
 * This function will format the Date in mm/dd/yy format
 * @param {object} date to be formatted
 */
export const formatDate = date => {
  const month = `0${date.getMonth() + 1}`.substr(-2);
  const dateStr = `0${date.getDate()}`.substr(-2);
  const year = date.getFullYear().toString();
  return `${month}/${dateStr}/${year}`;
};

/**
 * This function will check for valid date
 * @param {object} date to be check
 */
/* eslint-disable no-restricted-globals */
export const isValidDate = date => {
  return date instanceof Date && !isNaN(date);
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

const addressTypeMap = {
  street_number: 'streetNumber',
  route: 'streetName',
  locality: 'city',
  sublocality_level_1: 'city',
  administrative_area_level_1: 'state',
  country: 'country',
  postal_code: 'zip',
};

export const getAddressFromPlace = (place, inputValue) => {
  const address = {
    streetNumber: '',
    streetName: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  };
  if (typeof place.address_components === 'undefined') {
    return address;
  }
  for (let i = 0; i < place.address_components.length; i += 1) {
    const addressType = place.address_components[i].types[0];
    if (GOOGLE_PLACE_PARTS[addressType]) {
      const val = place.address_components[i][GOOGLE_PLACE_PARTS[addressType]];
      address[addressTypeMap[addressType]] = val;
    }
  }
  if (!address.streetNumber) {
    const regex = RegExp(`^(.*)${address.streetName.split(' ', 1)[0]}`);
    const result = regex.exec(inputValue);
    const inputNum = Array.isArray(result) && result[1] && Number(result[1]);

    if (!isNaN(inputNum) && parseInt(inputNum, 10) === inputNum) {
      address.streetNumber = inputNum;
    }
  }

  address.street = `${address.streetNumber} ${address.streetName}`.trim();

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

export const formatPhoneNumber = phone => {
  if (phone) return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 15)}`;
  return '';
};

export const MONTH_SHORT_FORMAT = {
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
    {
      id: '1',
      displayName: MONTH_SHORT_FORMAT.JAN,
    },
    {
      id: '2',
      displayName: MONTH_SHORT_FORMAT.FEB,
    },
    {
      id: '3',
      displayName: MONTH_SHORT_FORMAT.MAR,
    },
    {
      id: '4',
      displayName: MONTH_SHORT_FORMAT.APR,
    },
    {
      id: '5',
      displayName: MONTH_SHORT_FORMAT.MAY,
    },
    {
      id: '6',
      displayName: MONTH_SHORT_FORMAT.JUN,
    },
    {
      id: '7',
      displayName: MONTH_SHORT_FORMAT.JUL,
    },
    {
      id: '8',
      displayName: MONTH_SHORT_FORMAT.AUG,
    },
    {
      id: '9',
      displayName: MONTH_SHORT_FORMAT.SEP,
    },
    {
      id: '10',
      displayName: MONTH_SHORT_FORMAT.OCT,
    },
    {
      id: '11',
      displayName: MONTH_SHORT_FORMAT.NOV,
    },
    {
      id: '12',
      displayName: MONTH_SHORT_FORMAT.DEC,
    },
  ];

  const yearOptionsMap = [];
  const dayOptionsMap = [];
  const nowYear = new Date().getFullYear();

  for (let i = 1900; i < nowYear - 17; i += 1) {
    yearOptionsMap.push({
      id: i.toString(),
      displayName: i.toString(),
    });
  }

  for (let i = 1; i < 32; i += 1) {
    if (i <= 9) {
      i = 0 + i;
    }
    dayOptionsMap.push({
      id: i.toString(),
      displayName: i.toString(),
    });
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

export const childOptionsMap = () => {
  const currentYear = new Date().getFullYear();
  const yearOptionsMap = Array(17)
    .fill(currentYear)
    .map((e, index) => {
      const year = e - index;
      return {
        id: year.toString(),
        displayName: year.toString(),
      };
    });

  return {
    genderMap: [
      {
        id: '01',
        displayName: 'Boy',
      },
      {
        id: '0',
        displayName: 'Girl',
      },
    ],
    yearsMap: yearOptionsMap,
  };
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

// eslint-disable-next-line
export const getErrorSelector = (state, labels, errorKey) => {
  const errorParameters = state && state.getIn(['errorParameters', '0']);
  const errorCode = state && state.get('errorKey');
  if (
    (errorParameters && getLabelValue(labels, `${errorKey}_${errorParameters}`)) ||
    (errorCode && getLabelValue(labels, `${errorKey}_${errorCode}`))
  ) {
    if (errorParameters) {
      return getLabelValue(labels, `${errorKey}_${errorParameters}`);
    }
    return getLabelValue(labels, `${errorKey}_${errorCode}`);
  }
  return (state && state.getIn(['errorMessage', '_error'])) || getLabelValue(labels, `${errorKey}`);
};

export const generateUniqueKeyUsingLabel = label => {
  return label.replace(/\s/g, '_');
};

export const sanitizeEntity = string => {
  return string && typeof string === 'string'
    ? string
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&ldquo;/gi, '"')
        .replace(/&acute;/gi, '"')
        .replace(/&prime;/gi, '"')
        .replace(/&bdquo;/gi, '"')
        .replace(/&ldquot;/gi, '"')
        .replace(/\\u0027/gi, "'")
        .replace(/&lsquot;/gi, '"')
        .replace(/%20/gi, ' ')
    : string;
};

export const checkPhone = phone => {
  return (
    phone
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')
      .trim() || phone
  );
};

export const formatPhone = (phoneNum, hyphenFormat) => {
  let phone = phoneNum;
  let countryCode = '';
  if (typeof phone === 'number') {
    phone = phone.toString();
  }

  phone = checkPhone(phone);

  if (hyphenFormat && phone.length === 11) {
    countryCode = phone.substr(0, 1);
    phone = phone.substr(1); // Skip the first number for the phone number as it is the code
  }
  if (phone.length === 10) {
    const arrayPhone = [];
    let prefix;
    for (let i = 0; i < phone.length; i += 1) {
      arrayPhone.push(phone.substr(i, 1));
    }
    if (hyphenFormat) {
      prefix = `${arrayPhone[0]} ${arrayPhone[1]} ${arrayPhone[2]}-`;
    } else {
      prefix = `( ${arrayPhone[0]} ${arrayPhone[1]} ${arrayPhone[2]} + )`;
    }

    const sufix = `${arrayPhone[3]}
      ${arrayPhone[4]}
      ${arrayPhone[5]}
      -
      ${arrayPhone[6]}
      ${arrayPhone[7]}
      ${arrayPhone[8]}
      ${arrayPhone[9]}`;
    if (hyphenFormat) {
      phone = (countryCode ? `${countryCode}-` : '') + prefix + sufix;
    } else {
      phone = `${prefix} ${sufix}`;
    }
    return phone;
  }

  return phone;
};

export const getSiteId = () => {
  const paths = window.location.pathname.split('/', 2);
  return paths[1];
};
// eslint-disable-next-line
export const parseStoreHours = hoursOfOperation => {
  let carryOverClosingHour;
  const result = [];
  const keysOfHoursOfOperation = Object.keys(hoursOfOperation);
  keysOfHoursOfOperation.forEach(key => {
    const day = hoursOfOperation[key];
    // store was opened on the previous date and closing today,
    // so we need to push it as the first opening time of today
    if (carryOverClosingHour) {
      const date = carryOverClosingHour.split(' ')[0];
      day.availability.unshift({
        from: `${date} 00:00:00`,
        to: carryOverClosingHour,
      });
      carryOverClosingHour = null;
    }

    const storeHours = {
      dayName: day.nick.toUpperCase() || '',
      openIntervals: day.availability.map(availability => {
        const parsableFromDate = availability.from.replace('T', ' ');
        let parsableToDate = availability.to.replace('T', ' ');
        const fromDate = parseDate(parsableFromDate);
        const toDate = parseDate(parsableToDate);
        const isSameDay =
          fromDate.getFullYear() === toDate.getFullYear() &&
          fromDate.getMonth() === toDate.getMonth() &&
          fromDate.getDate() === toDate.getDate();

        if (!isSameDay) {
          // save carry over for next day
          carryOverClosingHour = parsableToDate;
          // set closing hour at 23.59.59 of today
          parsableToDate = `${fromDate.getFullYear()}  - ${fromDate.getMonth() +
            1} - ${fromDate.getDate()} 23:59:59`;
        }

        return {
          fromHour: parsableFromDate,
          toHour: parsableToDate,
        };
      }),
      isClosed: day.availability[0].status === 'closed',
    };

    result.push(storeHours);
  });

  return result;
};

export const parseBoolean = bool => {
  return bool === true || bool === '1' || (bool || '').toUpperCase() === 'TRUE';
};

export const getFormSKUValue = formValue => {
  return {
    color: (typeof formValue.color === 'object' && formValue.color.name) || formValue.color,
    size: (typeof formValue.Size === 'object' && formValue.Size.name) || formValue.Size,
    quantity:
      (typeof formValue.Quantity === 'object' && formValue.Quantity.name) || formValue.Quantity,
    fit:
      (formValue.Fit && typeof formValue.Fit === 'object' && formValue.Fit.name) || formValue.Fit,
  };
};

/**
 * This function configure url for Next/Link using CMS defined url string
 */
export const configureInternalNavigationFromCMSUrl = url => {
  const plpRoute = `${ROUTE_PATH.plp.name}/`;
  const pdpRoute = `${ROUTE_PATH.pdp.name}/`;
  const searchRoute = `${ROUTE_PATH.search.name}/`;

  if (url.includes(plpRoute)) {
    const urlItems = url.split(plpRoute);
    const queryParam = urlItems.join('');
    return `${ROUTE_PATH.plp.name}?${ROUTE_PATH.plp.param}=${queryParam}`;
  }
  if (url.includes(pdpRoute)) {
    const urlItems = url.split(pdpRoute);
    const queryParam = urlItems.join('');
    return `${ROUTE_PATH.pdp.name}?${ROUTE_PATH.pdp.param}=${queryParam}`;
  }
  if (url.includes(searchRoute)) {
    const urlItems = url.split(searchRoute);
    const queryParam = urlItems.join('');
    return `${ROUTE_PATH.search.name}?${ROUTE_PATH.search.param}=${queryParam}`;
  }
  return url;
};

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const WEEK_DAYS_SMALL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const MONTHS_SMALL = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * @method getDateInformation
 * @desc returns day, month and day of the respective date provided
 * @param {string} date date which is to be mutated
 * @param {upperCase} date determines case
 */

export const getDateInformation = (date, upperCase) => {
  const currentDate = date ? new Date(date) : new Date();
  return {
    // added a case for upper and lower case values
    day: upperCase ? WEEK_DAYS[currentDate.getDay()] : WEEK_DAYS_SMALL[currentDate.getDay()],
    month: upperCase ? MONTHS[currentDate.getMonth()] : MONTHS_SMALL[currentDate.getMonth()],
    date: currentDate.getDate(),
  };
};

export function buildStorePageUrlSuffix(storeBasicInfo) {
  const { id, storeName, address } = storeBasicInfo;
  return [storeName, address.state, address.city, address.zipCode, id]
    .join('-')
    .toLowerCase()
    .replace(/ /g, '');
}

export const extractFloat = currency => {
  try {
    return !currency
      ? 0
      : parseFloat(parseFloat(currency.toString().match(/[+-]?\d+(\.\d+)?/g)[0]).toFixed(2));
  } catch (e) {
    return 0;
  }
};

/* @method flattenArray - this function takes takes array of array and merge into single array
 * @param arr { Array } Array of Array
 * @return {Array}  return array
 */
export const flattenArray = arr => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
  }, []);
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
  formatPhoneNumber,
  getLabelValue,
  getCacheKeyForRedis,
  calculateAge,
  generateUniqueKeyUsingLabel,
  getErrorSelector,
  isValidDate,
  formatDate,
  parseStoreHours,
  parseBoolean,
  sanitizeEntity,
  getFormSKUValue,
  configureInternalNavigationFromCMSUrl,
  getDateInformation,
  buildStorePageUrlSuffix,
  extractFloat,
  getModifiedLanguageCode,
  getTranslateDateInformation,
};
