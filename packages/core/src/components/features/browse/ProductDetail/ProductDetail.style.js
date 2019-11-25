import { css } from 'styled-components';

export default css`
  .placeholder div {
    background: #d8d8d8;
    padding: 10px 0;
    margin-bottom: 5px;
    text-align: center;
  }
  .product-detail-section {
    flex: 1;
  }
  .product-image-wrapper {
    margin-right: 0;
  }
  .product-detail-image-wrapper {
    margin-bottom: 8px;
  }
  .button-go-back {
    border: none;
    display: flex;
    align-items: center;
    background: transparent;
    cursor: pointer;
  }
  .back-button {
    margin-left: 5px;
    color: ${props => props.theme.colors.TEXT.BLUE};
  }
  .go-back-container {
    padding-left: 5px;
    padding-bottom: 18px;
  }
  .product-summary-mobile-view {
    display: flex;
  }
  .product-summary-desktop-view {
    display: none;
  }
  .promo-area-top {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }
  .promo-area-middle {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .promo-area-bottom {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .product-summary-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;

    @media ${props => props.theme.mediaQuery.medium} {
      .product-details-header-container {
        margin-top: 13px;
      }

      .actual-price {
        font-size: ${props => props.theme.typography.fontSizes.fs22};
      }

      .original-price {
        font-size: ${props => props.theme.typography.fontSizes.fs13};
      }
    }
  }
  .clear-button {
    border: none;
    background: transparent;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    width: 35px;
  }
  .product-price-mobile-view {
    display: flex;
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    padding: 16px 0;
  }
  .product-price-desktop-view {
    display: none;
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
    .go-back-container {
      padding-left: 0;
      padding-bottom: 36px;
    }
  }
  .loyalty-banner {
    padding-right: 0;
    padding-left: 0;
  }
`;

export const customSubmitButtonStyle = css`
  .add-to-bag-button {
    max-width: none;
  }
  ${props =>
    props.isGiftCard
      ? `.button-wrapper {
    margin-top: ${props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props.theme.spacing.ELEM_SPACING.LRG};
  }
  .qty-selector {
    margin-top: 40px;
  }
  @media ${props.theme.mediaQuery.smallOnly} {
    .edit-form-css {
      margin-top: ${props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  `
      : ``}
  @media ${props => props.theme.mediaQuery.medium} {
    .add-to-bag-button {
      max-width: none;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .add-to-bag-button {
      max-width: 450px;
    }
  }

`;
