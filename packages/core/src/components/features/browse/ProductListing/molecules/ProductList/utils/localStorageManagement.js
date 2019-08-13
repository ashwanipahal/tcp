import { isClient } from '@tcp/core/src/utils';
import { readCookie, setCookie, removeCookie } from './cookieManagement';

/**
 * Set key/value data to localstorage
 * @param {Object} arg - Key/Value paired data to be set in localstorage
 */
export const setLocalStorage = arg => {
  const { key, value } = arg;
  if (isClient()) {
    return window.localStorage.setItem(key, value);
  }
  return setCookie(arg);
};

/**
 * Returns data stored in localstorage
 * @param {string} key - Localstorage item key
 * @returns {string} - Localstorage item data
 */
export const getLocalStorage = key => {
  if (isClient()) {
    return window.localStorage.getItem(key);
  }
  return readCookie(key);
};

/**
 * Remove data from localstorage
 * @param {string} key - Localstorage item key
 */
export const removeLocalStorage = key => {
  if (isClient()) {
    return window.localStorage.removeItem(key);
  }
  return removeCookie(key);
};

/**
 * Set multiple data to localstorage
 * @param {Array} storageArray - Array with multiple Key/Value
 * paired data to be set in localstorage
 */
export const setMultipleLocalStorage = storageArray => {
  for (let objKey = 0; objKey < storageArray.length; objKey += 1) {
    const { key, value } = storageArray[objKey];
    if (isClient()) {
      window.localStorage.setItem(key, value);
    } else {
      setCookie(storageArray[objKey]);
    }
  }
};

/**
 * Remove data from localstorage
 * @param {Array} keysArray - array containing keysArray Localstorage item keys
 */
export const removeMultipleLocalStorage = keysArray => {
  for (let objKey = 0; objKey < keysArray.length; objKey += 1) {
    const key = keysArray[objKey];
    if (isClient()) {
      window.localStorage.removeItem(key);
    } else {
      removeCookie(key);
    }
  }
};
