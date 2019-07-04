import {
  FONTS,
  LETTER_SPACINGS,
  LINE_HEIGHTS,
  TEXT_ALIGNS,
  FONT_WEIGHTS,
  FONT_SIZES,
  MOBILE_FONTS,
} from './typography.constants';

const BASE_HEADING_TYPOGRAPHY = {
  fontFamily: 'primary',
  fontSize: ['fs48', 'fs48', 'fs64'],
  fontWeight: 'black',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  textAlign: 'left',
};

function createThemeTypography(theme = {}) {
  const { typography = {} } = theme;
  const {
    fonts = FONTS,
    letterSpacings = LETTER_SPACINGS,
    lineHeights = LINE_HEIGHTS,
    textAligns = TEXT_ALIGNS,
    fontWeights = FONT_WEIGHTS,
    fontSizes = FONT_SIZES,
    mobileFonts = MOBILE_FONTS,
  } = typography;

  const {
    h1 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: ['fs48', 'fs48', 'fs64'],
    },
    h2 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: ['fs42', 'fs42', 'fs48'],
    },
    h3 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: ['fs20', 'fs20', 'fs38'],
      letterSpacing: ['ls167', 'ls167', 'ls271'],
    },
    h4 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: ['fs20', 'fs20', 'fs36'],
      fontWeight: 'semibold',
      letterSpacing: ['ls222', 'ls222', 'ls257'],
    },
    h5 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: ['fs16', 'fs16', 'fs28'],
      fontWeight: 'normal',
    },
    h6 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: 'fs16',
      fontFamily: 'secondary',
      fontWeight: 'semibold',
    },
    nav = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: 'fs15',
      fontFamily: 'secondary',
      fontWeight: 'semibold',
    },
    listMenu = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: 'fs14',
      fontFamily: 'secondary',
      fontWeight: 'semibold',
      lineHeight: ['lh115', 'lh115', 'lh107'],
    },
    navMinified = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: 'fs13',
      fontFamily: 'secondary',
      fontWeight: 'semibold',
      lineHeight: ['lh115', 'lh115', 'lh107'],
    },
  } = typography;

  return {
    fonts,
    fontWeights,
    fontSizes,
    letterSpacings,
    lineHeights,
    textAligns,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    nav,
    listMenu,
    navMinified,
    mobileFonts,
  };
}

export default createThemeTypography;
