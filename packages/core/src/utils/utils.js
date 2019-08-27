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

export default {
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
};
