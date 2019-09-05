import {
  FONTS,
  LETTER_SPACINGS,
  LINE_HEIGHTS,
  TEXT_ALIGNS,
  FONT_WEIGHTS,
  FONT_SIZES,
  ANDROID_FONTS,
} from './typography.constants';

const BASE_HEADING_TYPOGRAPHY = {
  fontFamily: 'primary',
  fontSize: ['fs48', 'fs48', 'fs64'],
  fontWeight: 'black',
  letterSpacing: 'normal',
  lineHeight: 'normal',
};

const gymboreeTypography = {
  fonts: FONTS,
  androidFonts: ANDROID_FONTS,
  letterSpacings: LETTER_SPACINGS,
  lineHeights: LINE_HEIGHTS,
  textAligns: TEXT_ALIGNS,
  fontWeights: FONT_WEIGHTS,
  fontSizes: FONT_SIZES,
  h1: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: ['fs48', 'fs48', 'fs64'],
  },
  h2: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: ['fs36', 'fs36', 'fs48'],
  },
  h3: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: ['fs20', 'fs20', 'fs38'],
    letterSpacing: ['ls167', 'ls167', 'ls317'],
  },
  h4: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: ['fs20', 'fs20', 'fs36'],
    fontWeight: 'regular',
    letterSpacing: ['ls222', 'ls222', 'ls4'],
  },
  h5: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: ['fs16', 'fs16', 'fs28'],
    fontWeight: 'normal',
  },
  h6: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: ['fs14', 'fs14', 'fs16'],
    fontFamily: 'secondary',
    fontWeight: 'semibold',
  },
  nav: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: 'fs15',
    fontFamily: 'secondary',
    fontWeight: 'semibold',
  },
  listMenu: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: ['fs13', 'fs13', 'fs14'],
    fontFamily: 'secondary',
    fontWeight: 'normal',
    lineHeight: ['lh115', 'lh115', 'lh107'],
  },
  navMinified: {
    ...BASE_HEADING_TYPOGRAPHY,
    fontSize: 'fs13',
    fontFamily: 'secondary',
    fontWeight: 'semibold',
    lineHeight: 'normal',
  },
};

export default gymboreeTypography;
