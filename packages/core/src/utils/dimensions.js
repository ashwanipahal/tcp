// eslint-disable-next-line
import { Dimensions } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const CURVE_HEIGHT = Math.round(screenWidth * (41 / 375));

const FONT_DAMPENER = 1 / 4;

const baseDesignWidth = 375;
const baseDesignHeight = 670;

/**
 * Generates a responsive font size when passed a percentage of the device's hypotenuse.
 *
 * @param {Number} percent - percentage of device hypotenuse
 * @return {Number}
 */
export const responsiveFontSize = percent =>
  Math.sqrt(screenHeight * screenHeight + screenWidth * screenWidth) *
  ((percent * FONT_DAMPENER) / 100);

/**
 * Checks for small devices (iPhone 5s and Nexus 5X) which often cause layout issues
 */
export const isSmallDevice = () => {
  return screenHeight < 600;
};

/**
 * Converts the pixel unit (e.g. value from design file) to a screen
 * width relative unit.
 *
 * @param unit value passed to be used as base value
 */
export function relativeSize(unit) {
  return (unit / baseDesignWidth) * screenWidth;
}

/**
 * Converts the pixel unit (e.g. value from design file) to a screen
 * height relative unit.
 *
 * @param unit value passed to be used as base value
 */
export function relativeSizeHeight(unit) {
  return (unit / baseDesignHeight) * screenHeight;
}
