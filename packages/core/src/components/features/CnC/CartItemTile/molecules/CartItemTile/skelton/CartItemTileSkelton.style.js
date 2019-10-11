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
    .badge-wrapper {
      width: 100px;
      display: block;
      margin-bottom: 5px;
    }
    .product-detail-row {
      margin-left: 0;
      width: 233px;
      margin-bottom: 5px;
    }
    .product-upc {
      width: 150px;
      display: block;
      height: 10px;
      margin-bottom: 14px;
    }
    .product-detail-row.label-responsive-wrapper {
      width: 100%;
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
  }
  .cart-item-radio-buttons {
    width: 100%;
    display: block;
    height: 39px;
    margin-bottom: 8px;
    span {
      display: block;
      height: 100%;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
