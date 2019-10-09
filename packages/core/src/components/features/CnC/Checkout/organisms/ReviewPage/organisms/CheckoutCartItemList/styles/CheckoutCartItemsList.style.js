import { css } from 'styled-components';

const styles = css`
  background-color: ${props => props.theme.colors.WHITE};
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};

  @media ${props => props.theme.mediaQuery.large} {
    width: calc(100% - ${props => props.theme.spacing.LAYOUT_SPACING.XXL});
  }

  .checkout-cart-list {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
  .cart-item-tile-container {
    border-top: 1px solid ${props => props.theme.colors.BLACK};
    margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    position: relative;
    .tile-header {
      padding-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    }
  }
  .checkout-cart-list-heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .pickup-header {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .header-list {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .store-of-product {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  .title-list-pickup-product {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    border-top: 1px solid ${props => props.theme.colors.BLACK};
  }
  .reviewPagePrice {
    position: absolute;
    right: 0;
    top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .toolTip {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
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
    .checkout-cart-list {
      margin-left: 0;
      margin-right: -28px;
    }
    .checkout-cart-list-heading {
      margin-left: 14px;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
    .cart-item-tile-container {
      margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
      .align-product-img {
        margin-right: 0;
      }
      .bag-product-detail-wrapper {
        width: 60%;
      }
      .tile-header {
        padding-left: 0px;
      }
    }
  }
`;

export default styles;
