import { isClient } from './index';
/**
 * Set key/value data to localstorage
 * @param {Object} arg - Key/Value paired data to be set in localstorage
 */
export const setLocalStorage = arg => {
  const { key, value } = arg;
  if (isClient()) {
    return window.localStorage.setItem(key, value);
  }
  // return setCookie(arg);
  return null;
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
  // return readCookie(key);
  return null;
};
