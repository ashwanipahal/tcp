const FALLBACK_FONT = 'Arial, Helvetica, sans-serif';
const PRIMARY_FONT = `Montserrat, ${FALLBACK_FONT}`;
const SECONDARY_FONT = `Nunito, ${FALLBACK_FONT}`;
const PRIMARY_FONT_SEMIBOLD = `Montserrat-SemiBold, ${FALLBACK_FONT}`;
const SECONDARY_FONT_SEMIBOLD = `Nunito-SemiBold, ${FALLBACK_FONT}`;
const PRIMARY_FONT_BLACK = `Montserrat-Black, ${FALLBACK_FONT}`;
const SECONDARY_FONT_BLACK = `Nunito-Black, ${FALLBACK_FONT}`;

const FONT_SIZE = {
  heading: {
    large: {
      h1: 64,
      h2: 48,
      h3: 36,
      h4: 28,
      h5: 28,
      h6: 16,
    },
    small: {
      h1: 48,
      h2: 32,
      h3: 24,
      h4: 18,
      h5: 18,
      h6: 16,
    },
  },
  body: {
    bodytext: {
      copy1: 10,
      copy2: 12,
      copy3: 14,
      copy4: 16,
      copy5: 18,
      copy6: 22,
      copy7: 24,
      copy8: 28,
      copy9: 32,
      copy10: 36,
      copy11: 42,
      copy12: 48,
    },

    large: {
      primary: 10,
      secondary: 13,
      tertiary: 11,
    },
    small: {
      primary: 10,
      secondary: 12,
      tertiary: 11,
    },
  },
  nav: 15,
  listmenu: {
    large: 14,
    small: 13,
  },
  promo1: {
    small: 15,
    large: 15,
  },
  promo2: {
    small: 11,
    large: 14,
  },
  button: {
    size: 14,
  },
  anchor: {
    small: 10,
    medium: 12,
    large: 15,
  },
  textbox: 13,
};

const FONT_WEIGHT = {
  normal: '400',
  semibold: '600',
  extrabold: '700',
  bold: '900',
};

const LINE_HEIGHT = {
  snug: 1,
  tight: 1.07,
  medium: 1.15,
  normal: 'normal',
};

const LETTER_SPACING = {
  normal: 'normal',
  wide: '2px',
};

// Typography
export default {
  primaryFontFamily: PRIMARY_FONT,
  secondaryFontFamily: SECONDARY_FONT,
  primaryFontSemilBoldFamily: PRIMARY_FONT_SEMIBOLD,
  secondaryFontSemilBoldFamily: SECONDARY_FONT_SEMIBOLD,
  primaryFontBlackFamily: PRIMARY_FONT_BLACK,
  secondaryFontBlackFamily: SECONDARY_FONT_BLACK,
  fontWeight: FONT_WEIGHT,
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
  letterSpacing: LETTER_SPACING,
};
