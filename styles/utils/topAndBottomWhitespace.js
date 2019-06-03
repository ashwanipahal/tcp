import theme from '../theme';

function topAndBottomWhitespace(type = 'padding') {
  const { mediaQuery, padding } = theme;

  return `
    ${type}-top: ${padding.paddingMedium};
    ${type}-bottom: ${padding.paddingMedium};

    @media ${mediaQuery.medium} {
      ${type}-top: ${padding.paddingExtraLarge};
      ${type}-bottom: ${padding.paddingExtraLarge};
    }
  `;
}

export default topAndBottomWhitespace;
