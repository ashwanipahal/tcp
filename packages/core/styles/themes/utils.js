const getColor = (colorPalette, colorKey) => {
  const colorSpliter = colorKey.split('.');
  return colorSpliter.length > 1
    ? colorPalette[colorSpliter[0]][colorSpliter[1]]
    : colorPalette[colorSpliter[0]];
};

const getFontSize = (typography, size) => {
  const { fontSizes } = typography;
  return fontSizes[size] || fontSizes.fs20;
};

export { getColor, getFontSize };
