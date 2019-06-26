const fallbackFonts = 'Arial, Helvetica, sans-serif';

function createThemeTypography(theme = {}) {
  const { typography = {} } = theme;
  const {
    fonts = { primary: `Montserrat, ${fallbackFonts}`, secondary: `Nunito, ${fallbackFonts}` },
    fontWeights = {
      normal: '400',
      semibold: '600',
      extrabold: '700',
      bold: '900',
    },
    fontSizes = [64, 48, 42, 38, 36, 32, 28, 24, 22, 20, 18, 16, 14, 13, 12, 10],
  } = typography;

  const baseHeading = {
    fontFamily: fonts.primary,
    fontSize: [fontSizes[0], fontSizes[1]],
    fontWeight: fontWeights.bold,
    letterSpacing: '',
    lineHeight: 1,
  };

  const baseBody = {
    fontFamily: fonts.primary,
    fontSize: fontSizes[0],
    fontWeight: fontWeights.bold,
    letterSpacing: '',
    lineHeight: 1,
  };

  const {
    h1 = {
      ...baseHeading,
      fontSize: [fontSizes[0], fontSizes[1]],
    },
    h2 = {
      ...baseHeading,
      fontSize: [fontSizes[1], fontSizes[2]],
    },
    h3 = {
      ...baseHeading,
      fontSize: [fontSizes[3], fontSizes[9]],
    },
    h4 = {
      ...baseHeading,
      fontSize: [fontSizes[4], fontSizes[9]],
    },
    h5 = {
      ...baseHeading,
      fontSize: [fontSizes[6], fontSizes[11]],
    },
    h6 = {
      ...baseHeading,
      fontSize: [fontSizes[11], fontSizes[11]],
      fontFamily: fonts.secondary,
    },
    body1 = {
      ...baseBody,
    },
    body2 = {
      ...baseBody,
    },
    body3 = {
      ...baseBody,
    },
    body4 = {
      ...baseBody,
    },
    body5 = {
      ...baseBody,
    },
    body6 = {
      ...baseBody,
    },
    body7 = {
      ...baseBody,
    },
    body8 = {
      ...baseBody,
    },
    body9 = {
      ...baseBody,
    },
    body10 = {
      ...baseBody,
    },
    body11 = {
      ...baseBody,
    },
    body12 = {
      ...baseBody,
    },
  } = typography;

  return {
    fonts,
    fontWeights,
    fontSizes,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body1,
    body2,
    body3,
    body4,
    body5,
    body6,
    body7,
    body8,
    body9,
    body10,
    body11,
    body12,
  };
}

export default createThemeTypography;
