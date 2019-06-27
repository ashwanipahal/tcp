const fallbackFonts = 'Arial, Helvetica, sans-serif';

function createThemeTypography(theme = {}) {
  const { typography = {} } = theme;
  const {
    fonts = {
      primary: `Montserrat, ${fallbackFonts}`,
      secondary: `Nunito, ${fallbackFonts}`,
    },
    letterSpacings = {
      1: '2.71px',
      2: '2.22px',
      3: '2.57px',
      4: '1.67px',
      normal: 'normal',
    },
    lineHeights = { normal: 'normal' },
    textAligns = { left: 'left', center: 'center' },
    fontWeights = {
      normal: '400',
      semibold: '600',
      extrabold: '700',
      bold: '900',
    },
    fontSizes = {
      1: '64px',
      2: '48px',
      3: '42px',
      4: '38px',
      5: '36px',
      6: '32px',
      7: '28px',
      8: '24px',
      9: '22px',
      10: '20px',
      11: '18px',
      12: '16px',
      13: '14px',
      14: '13px',
      15: '12px',
      16: '10px',
    },
  } = typography;

  const baseHeading = {
    fontFamily: 'primary',
    fontSize: [1, 2],
    fontWeight: 'bold',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    textAlign: 'left',
  };

  const baseBody = {
    fontFamily: 'primary',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    textAlign: 'left',
  };

  const {
    h1 = {
      ...baseHeading,
      fontSize: [2, 1],
    },
    h2 = {
      ...baseHeading,
      fontSize: [3, 2],
    },
    h3 = {
      ...baseHeading,
      fontSize: [10, 4],
      letterSpacing: [4, 1],
    },
    h4 = {
      ...baseHeading,
      fontSize: [10, 5],
      fontWeight: 'semibold',
      letterSpacing: [2, 3],
    },
    h5 = {
      ...baseHeading,
      fontSize: [12, 7],
      fontWeight: 'normal',
      letterSpacing: [2, 4],
    },
    h6 = {
      ...baseHeading,
      fontSize: 12,
      fontFamily: 'secondary',
      fontWeight: 'semibold',
    },
    body1 = {
      ...baseBody,
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
