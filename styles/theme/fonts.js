const SANS_SERIF = 'Arial, Helvetica, sans-serif';
const MONTSERRAT = `Montserrat, ${SANS_SERIF}`;

const SERIF = 'Times New Roman, serif';
const NUNITO = `Nunito, ${SERIF}`;

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
  icon: {
    primary: 22,
    secondary: 14,
    tertiary: 12,
    quaternary: 10,
  },
  link: {
    small: {
      primary: 14,
    },
    large: {
      primary: 16,
    },
  },

  nav: 15,
  listmenu: {
    small: 13,
    large: 14,
  },
  promo1: {
    small: 15,
    large: 15,
  },
  promo2: {
    small: 11,
    large: 14,
  },
};

const FONT_WEIGHT = {
  light: '300',
  normal: '400',
  book: '500',
  medium: '500',
  semiBold: '600',
  bold: '700',
  black: '900',
};

const LINE_HEIGHT = {
  snug: 1,
  tight: 1.25,
  normal: 1.4,
  loose: 1.6,
};

// Typography
export default {
  primaryFontFamily: MONTSERRAT,
  secondaryFontFamily: NUNITO,
  fontWeight: FONT_WEIGHT,
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
};
