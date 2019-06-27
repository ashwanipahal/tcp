import {
  FONTS,
  LETTER_SPACINGS,
  LINE_HEIGHTS,
  TEXT_ALIGNS,
  FONT_WEIGHTS,
  FONT_SIZES,
} from './typography.constants';

const BASE_HEADING_TYPOGRAPHY = {
  fontFamily: 'primary',
  fontSize: [1, 2],
  fontWeight: 'bold',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  textAlign: 'left',
};

const BASE_BODY_TYPOGRAPHY = {
  fontFamily: 'primary',
  fontSize: 1,
  fontWeight: 'bold',
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
  } = typography;

  const {
    h1 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: [2, 1],
    },
    h2 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: [3, 2],
    },
    h3 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: [10, 4],
      letterSpacing: [4, 1],
    },
    h4 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: [10, 5],
      fontWeight: 'semibold',
      letterSpacing: [2, 3],
    },
    h5 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: [12, 7],
      fontWeight: 'normal',
      letterSpacing: [2, 4],
    },
    h6 = {
      ...BASE_HEADING_TYPOGRAPHY,
      fontSize: 12,
      fontFamily: 'secondary',
      fontWeight: 'semibold',
    },
    body1 = {
      ...BASE_BODY_TYPOGRAPHY,
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
    body1,
  };
}

export default createThemeTypography;
