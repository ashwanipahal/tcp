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
    fontSize: `${fontSizes[0]}px`,
    fontWeight: fontWeights.bold,
    letterSpacing: '',
    lineHeight: 1,
  };

  const {
    h1 = {
      ...baseHeading,
      fontSize: [`${fontSizes[0]}px`, `${fontSizes[1]}px`],
    },
    h2 = {
      ...baseHeading,
      fontSize: [`${fontSizes[1]}px`, `${fontSizes[2]}px`],
    },
    h3 = {
      ...baseHeading,
      fontSize: [`${fontSizes[3]}px`, `${fontSizes[9]}px`],
    },
    h4 = {
      ...baseHeading,
      fontSize: [`${fontSizes[4]}px`, `${fontSizes[9]}px`],
    },
    h5 = {
      ...baseHeading,
      fontSize: [`${fontSizes[6]}px`, `${fontSizes[11]}px`],
    },
    h6 = {
      ...baseHeading,
      fontSize: [`${fontSizes[11]}px`, `${fontSizes[11]}px`],
      fontFamily: fonts.secondary,
    },
    body1 = {
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
  };
}

export default createThemeTypography;
