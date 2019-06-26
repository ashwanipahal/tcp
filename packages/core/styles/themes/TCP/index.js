import createThemeColors from '../createThemeColors';
import createThemeTypography from '../createThemeTypography';
import fonts from './fonts';
import zindex from './zindex';
import gridDimensions from './gridDimensions';
import { mediaQuery, breakpoints } from './mediaQuery';

import opacity from './opacity';

const colors = createThemeColors();
const typography = createThemeTypography();

const theme = {
  colors,
  typography,
  fonts,
  mediaQuery,
  breakpoints,
  zindex,
  gridDimensions,
  opacity,
};

export default theme;
