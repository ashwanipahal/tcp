import { isClient, isMobileApp } from './utils';

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
