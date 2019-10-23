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
  }
  .back-button {
    margin-left: 5px;
    color: ${props => props.theme.colors.TEXT.BLUE};
  }
  .product-summary-mobile-view {
    display: flex;
  }
  .product-summary-desktop-view {
    display: none;
  }
  .product-summary-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
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
