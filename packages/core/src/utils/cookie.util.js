import { isClient, isMobileApp } from './utils';

export const CART_ITEM_COUNTER = 'cartItemsCount';
export const SFL_ITEM_COUNTER = 'sflItemsCount_US';
export const SFL_ITEM_COUNTER_CA = 'sflItemsCount_CA';

/**
 * @summary This is to read cookie from a Mobile App.
 * @returns {null} for now but will eventually resolve with the key of cookie to return the value or null in case key does not match
 */
const readCookieMobileApp = () => {
  // TODO - work on it to get cookie from Mobile APP
  return null;
};

/**
 * @summary This is to read cookie from a browser. In case of node, we pass the cookie in string.
 * @param {string} key - Cookie key/name
 * @param {string} cookieString - Cookie value in string to be used in case of Node
 * @returns {string} Resolves with the key of cookie to return the value or null in case key does not match
 */
const readCookieWeb = (key, cookieString) => {
  try {
    if (isClient() || cookieString) {
      const name = `${key}=`;
      const decodedCookie = decodeURIComponent(cookieString || document.cookie).split(';');
      for (let i = 0; i < decodedCookie.length; i += 1) {
        let c = decodedCookie[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * @summary This is a wrapper to read cookie from mobile app.
 * @param {string} key - Cookie key/name
 * @param {string} cookieString - Cookie value in string to be used in case of Node
 */
export const readCookie = (key, cookieString) => {
  if (isMobileApp()) {
    return readCookieMobileApp();
  }
  return readCookieWeb(key, cookieString);
};

/**
 * Remove cookie in browser based on the key
 * @param {string} key - Cookie key/name
 */
export const removeCookie = key => {
  if (isClient()) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
};

export function getCartItemCount() {
  return parseInt(readCookie(CART_ITEM_COUNTER) || 0, 10);
}

export function getSflItemCount(siteId) {
  // If CA site, fetch CA cookies. Else pick the US cookies for sflCount by default.
  if (siteId === 'CA') {
    return parseInt(readCookie(SFL_ITEM_COUNTER_CA) || 0, 10);
  }
  return parseInt(readCookie(SFL_ITEM_COUNTER) || 0, 10);
}

/**
 * @summary This returns all cookies in string format.
 * @return  {String}  - string of cookies
 */
export const getAllCookies = () => {
  return document.cookie;
};
