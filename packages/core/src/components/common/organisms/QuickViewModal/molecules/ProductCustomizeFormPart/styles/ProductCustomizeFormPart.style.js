import { css } from 'styled-components';

const styles = css`
  .product-customize-form-container {
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

export default styles;
