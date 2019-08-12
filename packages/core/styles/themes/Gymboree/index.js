import createThemeColorPalette from '../createThemeColorPalette';
import createThemeTypography from '../createThemeTypography';
// import colors from '../TCP/colors';
import green from '../colors/green';
import blue from '../colors/blue';
import orange from '../colors/orange';
import zindex from '../TCP/zindex';
import spacing from '../TCP/spacing';
import gridDimensions from '../TCP/gridDimensions';
import { mediaQuery, breakpoints } from '../TCP/mediaQuery';
import gymboreeTypography from './gymboreeTypography';
import opacity from '../TCP/opacity';
import colors from '../TCP/colors';
import fonts from '../TCP/fonts';

const colorPalette = createThemeColorPalette({
  primary: {
    light: orange[300],
    main: orange[500],
    dark: orange[700],
  },
});

const typography = createThemeTypography({
  typography: gymboreeTypography,
});

const themeGymboree = {
  colorPalette: { ...colorPalette, green, blue },
  /* colors object has been deprecated and, will be removed in the future release.
   Please use colorPalette instead */
  colors,
  /* fonts object has been deprecated and, will be removed in the future release.
  Please use typography instead */
  fonts,
  typography,
  mediaQuery,
  breakpoints,
  zindex,
  gridDimensions,
  opacity,
  spacing,
};

export default themeGymboree;
