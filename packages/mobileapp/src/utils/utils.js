import moment from 'moment';
import CookieManager from 'react-native-cookies';
import { getAPIConfig } from '@tcp/core/src/utils';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import {
  setValueInAsyncStorage,
  getValueFromAsyncStorage,
  getScreenWidth,
} from '@tcp/core/src/utils/index.native';

import icons from './icons';
import { APP_TYPE } from '../components/common/hoc/ThemeWrapper.constants';

let brandName = APP_TYPE.TCP;
const MOMENT_DATE_FORMAT = 'YYYY-MM-DD';

// constants for last splash animation
export const AppAnimationConfig = {
  ANIMATION_REPEAT_DAYS: 30,
  LAST_ANIMATION_DATE: 'LAST_ANIMATION_DATE',
  PeekABooViewMaxHeight: 100,
  PeekABooViewMinHeight: 0,
  PeekABooLogoMaxHeight: 80,
  PeekABooLogoMaxWidth: 100,
  AnimationDelay: 1000,
  AppSplashMaxWidth: getScreenWidth() / 2,
  BrandSwitch: {
    MAX_X: 90,
    AnimationDuration: 500,
  },
};

/**
 * This function returns icon based on brand
 * @param {*} icon Icon name
 * @param {*} brand Brand
 */
export const getIconByBrand = (icon, brand) => {
  switch (icon) {
    case 'home-active':
      return icons[brand].homeActive;
    case 'shop-active': {
      return icons[brand].shopActive;
    }
    case 'account-active': {
      return icons[brand].accountActive;
    }
    case 'wallet-active': {
      return icons[brand].walletActive;
    }
    case 'brand-logo': {
      return icons[brand].brandLogo;
    }
    default:
      return icons.homeInactive;
  }
};

/**
 * Returns icon based on icon name, if not found will search for icon in current selected brand
 * @param {*} icon
 */
export const getIcon = icon => {
  switch (icon) {
    case 'home-inactive':
      return icons.homeInactive;
    case 'shop-inactive':
      return icons.shopInactive;
    case 'account-inactive':
      return icons.accountInactive;
    case 'wallet-inactive':
      return icons.walletInactive;
    case 'close-icon':
      return icons.closeIcon;
    default:
      return getIconByBrand(icon, brandName);
  }
};

/**
 * @function getAppSplashLogo
 * This method retrieves current app splash logo
 *
 * @returns: appSplashLogo
 */
export const getAppSplashLogo = () => {
  return icons[brandName].splash;
};

/**
 * @function getSecondAppLogo
 * This method retrieves second app logo
 *
 * @returns: secondAppLogo
 */
export const getSecondAppLogo = () => {
  const { TCP, GYMBOREE } = APP_TYPE;
  const secondBrand = brandName === TCP ? GYMBOREE : TCP;
  return icons[secondBrand].peekABoo;
};

/**
 * @function getSecondBrandThemeColor
 * This method retrieves second app theme main color
 *
 * @returns: secondAppBrandColor
 */
export const getSecondBrandThemeColor = () => {
  const colorPallete = createThemeColorPalette();
  return brandName === APP_TYPE.TCP ? colorPallete.orange[800] : colorPallete.primary.light;
};

/**
 * @function updateBrandName
 * This method saves brand name locally
 *
 */
export const updateBrandName = appType => {
  brandName = appType;
};

/**
 * @function updateLastSplashAnimationDate
 * This method saves last splash animation date in asyncstorage
 *
 */
export const updateLastSplashAnimationDate = async () => {
  setValueInAsyncStorage(
    AppAnimationConfig.LAST_ANIMATION_DATE,
    moment().format(MOMENT_DATE_FORMAT)
  );
};

/**
 * @function: shouldAnimateLogo
 * This method checks if last animation date has past 30 days
 * @returns if last animation date has past 30 days, returns true
 * else returns false
 *
 * @returns
 */
export const shouldAnimateLogo = async () => {
  const today = moment();
  const { LAST_ANIMATION_DATE, ANIMATION_REPEAT_DAYS } = AppAnimationConfig;
  const lastAnimationDate = await getValueFromAsyncStorage(LAST_ANIMATION_DATE);
  const isLastAnimationDiffValid =
    lastAnimationDate &&
    today.diff(moment(lastAnimationDate, MOMENT_DATE_FORMAT), 'days') >= ANIMATION_REPEAT_DAYS;
  return lastAnimationDate ? isLastAnimationDiffValid : true;
};

export default {
  getIcon,
};

/**
 * This function reads cookie for mobile app
 */
export const readCookieMobileApp = key => {
  const apiConfigObj = getAPIConfig();
  const res = apiConfigObj.domain ? CookieManager.get(apiConfigObj.domain) : null;
  return res && res[key];
};
