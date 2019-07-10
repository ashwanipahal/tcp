import { isClient } from './utils';

export const readCookie = (key, cookieString) => {
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
 * Remove cookie
 * @param {string} key - Cookie key/name
 */
export const removeCookie = key => {
  if (isClient()) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
};
