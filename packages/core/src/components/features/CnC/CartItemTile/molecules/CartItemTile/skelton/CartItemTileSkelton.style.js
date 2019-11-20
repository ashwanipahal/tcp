import { css } from 'styled-components';

export default css`
  padding: 10px 15px 20px 15px;
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};
  margin: 15px 0;
  .product-brand-img-wrapper {
    width: 105px;
    padding: 18px 0px 18px 5px;
    .imageWrapper {
      width: 100px;
      height: 117px;
    }
    .logoWrapper {
      margin-top: 10px;
      width: 100px;
      height: 30px;
    }
  }
  .bag-product-detail-wrapper {
    margin-top: 21px;
    width: auto;
    .badge-wrapper {
      width: 100px;
      display: block;
      margin-bottom: 5px;
    }
    .product-detail-row {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 135px;
      }
      margin-left: 0;
      width: 233px;
      margin-bottom: 5px;
    }
    .product-upc {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 100px;
      }
      width: 150px;
      display: block;
      height: 10px;
      margin-bottom: 14px;
    }
    .product-detail-row.label-responsive-wrapper {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 150px;
      }
      width: 250px;
      height: 19px;
      display: block;
      margin-left: 0;
      margin-top: 5px;
      margin-bottom: 6px;
    }
    .product-price {
      width: 112px;
      display: block;
    }
    .product-points {
      display: block;
      width: 109px;
    }
    .save-for-later {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        margin-right: 15px;
        width: 60px;
      }
      display: inline-block;
      margin-right: 50px;
      width: 89px;
      height: 18px;
    }
    .edit {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 60px;
      }
      display: inline-block;
      width: 89px;
      height: 18px;
    }
  }
  .cart-item-radio-button-top {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    width: 253px;
    display: block;
    height: 20px;
    span {
      display: block;
      height: 100%;
    }
  }
  .cart-item-radio-button-middle {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    width: 119px;
    display: block;
    height: 19px;
    span {
      display: block;
      height: 100%;
    }
  }
  .cart-item-radio-button-bottom {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    width: 119px;
    display: block;
    height: 19px;
    span {
      display: block;
      height: 100%;
    }
  }
  .row-border-top-middle {
    border-top: 1px solid #9b9b9b;
  }
  .row-border-bottom {
    border-top: 1px solid #9b9b9b;
    border-bottom: 1px solid #9b9b9b;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
