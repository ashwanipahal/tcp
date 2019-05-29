import theme from '../theme';

function maxWidthWithPadding(maxWidth) {
  const { mediaQuery, sizes, padding } = theme;
  const maximumContainerWidth = {
    large: sizes.uiMaxWidth,
    small: sizes.gridMaxWidth,
  };

  return `
    width: 100%;
    max-width: ${maximumContainerWidth[maxWidth] || 'none'};
    margin-left: auto;
    margin-right: auto;
    padding-left: ${padding.paddingDefault};
    padding-right: ${padding.paddingDefault};

    @media ${mediaQuery.mediumOnly} {
      padding-left: ${padding.paddingSemiLarge};
      padding-right: ${padding.paddingSemiLarge};
    }

    @media ${mediaQuery.medium} {
      padding-left: ${padding.paddingLarge};
      padding-right: ${padding.paddingLarge};
    }
  `;
}

export default maxWidthWithPadding;
