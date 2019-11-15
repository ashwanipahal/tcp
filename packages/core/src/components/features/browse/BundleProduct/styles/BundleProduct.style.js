import { css } from 'styled-components';

export default css`
  .placeholder-large {
    background: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    padding: 10px 0;
    text-align: center;
    width: calc(100% - 26px);
    margin: 0 13px ${props => props.theme.spacing.ELEM_SPACING.MED};

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 13px ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 13px ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .placeholder-small {
    background: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    padding: 20px 0;
    text-align: center;
    width: 100%;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0;

    @media ${props => props.theme.mediaQuery.medium} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.XXL} 0;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0;
    }
  }

  .breadcrum-wrapper {
    margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.LRG};

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
  .bundle-products-list {
    margin: 0;
    width: 100%;
  }
  .bundle-product-item .product-information {
    max-width: 47%;
    @media ${props => props.theme.mediaQuery.medium} {
      max-width: 56%;
    }
  }
  .bundle-product-item .tablet-image-section {
    max-width: 36%;
  }
  .product-detail-section {
    flex: 1;
    margin: 0;
  }
  .product-image-wrapper {
    margin-right: 0;
  }
  .product-detail-image-wrapper {
    margin-bottom: 8px;
  }
  .product-summary-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .bundle-social-wrapper {
    justify-content: right;
  }
  .product-summary-section {
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .bundle-product-item {
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    &:last-child {
      border-bottom: 0;
    }
  }
  .product-container {
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .actual-price {
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.typography.fontSizes.fs24};
    }
  }
  .original-price {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
  }

  .outfiting-list-details {
    .actual-price {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy7};
    }
    .original-price {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .product-image-wrapper {
      margin-right: 30px;
    }
    .product-detail-image-wrapper {
      margin-bottom: 11px;
    }
    .product-summary-mobile-view {
      display: none;
    }
    .product-summary-desktop-view {
      display: flex;
    }
    .product-price-mobile-view {
      display: none;
    }
    .product-price-desktop-view {
      display: flex;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .product-image-wrapper {
      margin-right: 0;
    }
    .product-detail-image-wrapper {
      margin-bottom: 27px;
    }
    .product-summary-mobile-view {
      display: none;
    }
    .product-summary-desktop-view {
      display: flex;
    }
    .product-price-mobile-view {
      display: none;
    }
    .product-price-desktop-view {
      display: flex;
      border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;
