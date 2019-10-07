import { css } from 'styled-components';

const styles = css`
  background-color: ${props => props.theme.colors.WHITE};
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};

  .checkout-cart-list {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
  .checkout-cart-list-shipping {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
  .cart-item-tile-container {
    border-top: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
    margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    position: relative;
    .tile-header {
      padding-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
      border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
    }
  }
  .checkout-cart-list-heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .pickup-header {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    div {
      margin: 0;
    }
  }
  .header-list {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .store-of-product {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  .title-list-pickup-product {
    div {
      margin: 0;
    }
  }
  .reviewPagePrice {
    position: absolute;
    right: 0;
    top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .toolTip {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    vertical-align: bottom;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .align-product-img {
      width: auto;
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .checkout-cart-list-shipping {
      margin-left: 0;
      margin-right: 0;
      width: 100%;
    }
    .cart-item-tile-container {
      .bag-product-detail-wrapper {
        width: 60%;
      }
      .tile-header {
        padding-left: 0px;
      }
      .align-product-img {
        margin-right: 0px;
        justify-content: center;
        align-items: center;
      }
    }
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    padding: 0;
    width: 108%;
    margin-left: -14px;
    margin-top: 0;
    div.checkout-cart-list {
      margin-left: 14px;
      margin-right: 14px;
      width: calc(100% - 28px);
    }
    .checkout-cart-list-heading {
      margin-left: 14px;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
    .cart-item-tile-container {
      margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
      .align-product-img {
        margin-right: 0;
      }
      .bag-product-detail-wrapper {
        width: 60%;
      }
      .tile-header {
        padding-left: 0px;
      }
      .product-detail {
        margin-right: 35px;
      }
    }
  }
`;

export default styles;
