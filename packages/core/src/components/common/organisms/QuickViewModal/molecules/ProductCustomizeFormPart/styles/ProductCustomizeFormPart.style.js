import { css } from 'styled-components';

const styles = css`
  flex-direction: column;
  display: flex;
  @media ${props => props.theme.mediaQuery.smallOnly} {
    padding: 0 8px;
  }
  .product-customize-form-container {
    padding-right: ${props =>
      props.isMultiItemQVModal ? props.theme.spacing.ELEM_SPACING.XXL : 0};
    flex-direction: column;
    display: flex;
  }
  .image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    width: 161px;
  }
  .product-link {
    text-decoration: underline;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .product-detail {
    display: flex;
    flex: 1;
    flex-direction: row;
  }
  .product-name {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .product-details-card-container-separate {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .product-details-card-container {
    display: none;
  }
  .image-title-wrapper {
    display: flex;
    flex-direction: row;
    z-index: 1;
  }
  .price-container {
    display: inline-flex;

    .actual-price {
      color: ${props => props.theme.colorPalette.red};
      font-size: ${props => props.theme.typography.fontSizes.fs22};
    }
    .original-price {
      font-size: ${props => props.theme.typography.fontSizes.fs16};
      color: ${props => props.theme.colorPalette.gray[900]};
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      line-height: 1.9;
    }
  }
  .multi-items-QV-product {
    ${props =>
      props.isMultiItemQVModal
        ? `
    display: flex;
    flex-direction: row;
    padding:${props.theme.spacing.ELEM_SPACING.LRG} ${props.theme.spacing.ELEM_SPACING.SM} ${
            props.theme.spacing.ELEM_SPACING.SM
          } ${props.theme.spacing.ELEM_SPACING.XS};
    border-bottom: 1px solid ${props.theme.colors.BORDER.NORMAL};
    @media ${props.theme.mediaQuery.medium} {
      padding:${props.theme.spacing.ELEM_SPACING.SM} 0;
      border: 1px solid ${props.theme.colors.BORDER.NORMAL};
      margin-bottom: ${props.theme.spacing.ELEM_SPACING.MED};
    }
  `
        : `
    padding:0 ${props.theme.spacing.ELEM_SPACING.XS};
  `}
    ${props =>
      props.formEnabled
        ? `
  opacity: 1;
  pointer-events: all;
`
        : `
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: ${props.theme.colorPalette.gray[500]};
    z-index: 1300;
    opacity: 0.25;
    pointer-events: none;
  `}
  }

  .inputCheckBox {
    position: relative;
    background-color: ${props => props.theme.colors.WHITE};
    width: 25px;
    margin-top: -25px;
    top: 48px;
    left: 88%;
    z-index: ${props => props.theme.zindex.zModal + 1};
    @media ${props => props.theme.mediaQuery.medium} {
      left: 93%;
      top: 39px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      left: 94%;
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .image-wrapper {
      width: 264px;
    }
    .product-details-card-container-separate {
      display: none;
    }
    .product-details-card-container {
      display: block;
    }
    .product-detail {
      flex-direction: column;
    }
    .product-customize-form-container {
      flex-direction: row;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .image-wrapper {
      width: 243px;
    }
    .product-details-card-container-separate {
      display: none;
    }
    .product-details-card-container {
      display: block;
    }
    .product-detail {
      flex-direction: column;
    }
    .product-customize-form-container {
      flex-direction: row;
    }
  }
`;

export const customPriceStyles = css`
  .list-badge-container {
    display: flex;
  }
`;

export const customSubmitButtonStyle = css`
  @media ${props => props.theme.mediaQuery.large} {
    .add-to-bag-button {
      width: 243px;
    }
  }
`;

export default styles;
