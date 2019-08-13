import { isClient } from '@tcp/core/src/utils';

export const CART_ITEM_COUNTER = 'cartItemsCount';
export const SFL_ITEM_COUNTER = 'sflItemsCount_US';
export const SFL_ITEM_COUNTER_CA = 'sflItemsCount_CA';
export const TCP_PRIVACY_POLICY_DISPLAYED = 'tcpPrivacyPolicyDisplayed';
export const TCP_COUNTRY = 'tcpCountryDetail';
export const LAST_TIME_CART_FLYOUT_SHOWN = 'lastTimeCartFlyoutIsShown';
export const LAST_NAVIGATION_LOCATION = 'lastNavigationLocation';
export const TCP_SEGMENT = 'tcpSegment';

export const setCookie = args => {
  const { key, value, daysAlive } = args;
  const isBrowser = isClient();

  // eslint-disable-next-line
  if (isBrowser && window._satellite && window._satellite.setCookie) {
    // eslint-disable-next-line
    window._satellite.setCookie(key, value, daysAlive);
  } else if (isBrowser) {
    const date = new Date();
    date.setTime(date.getTime() + daysAlive * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
  }
};

/* eslint-disable */
export const readCookie = (key, cookieString) => {
  let isBrowser = isClient();
  try {
    if (isBrowser && window._satellite && window._satellite.readCookie) {
      return window._satellite.readCookie(key);
    } else if (isBrowser || cookieString) {
      let name = key + '=';
      let decodedCookie = decodeURIComponent(cookieString || document.cookie).split(';');

      for (let i = 0; i < decodedCookie.length; i++) {
        let c = decodedCookie[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
  } catch (error) {
    return '';
  }
};
/* eslint-enable */

/**
 * Remove cookie
 * @param {string} key - Cookie key/name
 */
export const removeCookie = key => {
  const isBrowser = isClient();

  if (isBrowser) {
    // eslint-disable-next-line
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};

export function getCartItemCount() {
  // eslint-disable-next-line
  return parseInt(readCookie(CART_ITEM_COUNTER) || 0);
}

export function getSflItemCount(siteId) {
  // If CA site, fetch CA cookies. Else pick the US cookies for sflCount by default.
  if (siteId === 'ca') {
    // eslint-disable-next-line
    return parseInt(readCookie(SFL_ITEM_COUNTER_CA) || 0);
  }
  // eslint-disable-next-line
  return parseInt(readCookie(SFL_ITEM_COUNTER) || 0);
}
