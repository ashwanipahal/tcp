import createThemeColorPalette from './createThemeColorPalette';
import createThemeTypography from '../createThemeTypography';
import colors from './colors';
import green from '../colors/green';
import fonts from './fonts';
import zindex from './zindex';
import spacing from './spacing';
import gridDimensions from './gridDimensions';
import { mediaQuery, breakpoints } from './mediaQuery';

import opacity from './opacity';

const colorPalette = createThemeColorPalette();
const typography = createThemeTypography();

const themeGymboree = {
  /* add required colors other than default as per theme requirement */
  colorPalette: { ...colorPalette, green },
  /* colors object has been deprecated and, will be removed in the future release.
   Please use colorPalette instead */
  colors,
  typography,
  /* fonts object has been deprecated and, will be removed in the future release.
   Please use typography instead */
  fonts,
  mediaQuery,
  breakpoints,
  zindex,
  gridDimensions,
  opacity,
  spacing,
};

export default themeGymboree;
