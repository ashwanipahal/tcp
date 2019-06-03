import theme from '../theme';

function maxWidthNoPadding(maxWidth) {
  const { sizes } = theme;
  const maximumContainerWidth = {
    large: sizes.uiMaxWidth,
    small: sizes.gridMaxWidth,
  };

  return `
    width: 100%;
    max-width: ${maximumContainerWidth[maxWidth] || 'none'};
    margin-left: auto;
    margin-right: auto;
  `;
}

export default maxWidthNoPadding;
