import createThemeColors from '../createThemeColors';
import createThemeTypography from '../createThemeTypography';
import colors from './colors';
import green from '../colors/green';
import fonts from './fonts';
import zindex from './zindex';
import gridDimensions from './gridDimensions';
import { mediaQuery, breakpoints } from './mediaQuery';

import opacity from './opacity';

const colorPalette = createThemeColors();
const typography = createThemeTypography();

const theme = {
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
};

export default theme;
