import createThemeColors from '../createThemeColors';
import createThemeTypography from '../createThemeTypography';
import colors from './colors';
import fonts from './fonts';
import zindex from './zindex';
import gridDimensions from './gridDimensions';
import { mediaQuery, breakpoints } from './mediaQuery';

import opacity from './opacity';

const colorPallete = createThemeColors();
const typography = createThemeTypography();

const theme = {
  colorPallete,
  /* colors object has been deprecated and, will be removed in the future release.
   Please use colorPallete instead */
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
