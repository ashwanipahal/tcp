import { css } from 'styled-components';

const styles = css`
  background-color: white;
  margin: 32px 0 24px;
  padding: 15px;

  @media ${props => props.theme.mediaQuery.smallMax} {
    padding: 0;
  }

  .cart-item-tile-container {
    border-top: 1px solid black;
    position: relative;
  }
  .checkout-cart-list-heading {
    margin-bottom: 15px;
  }
  .pickup-header {
    margin-bottom: 9px;
  }
  .header-list {
    margin-bottom: 16px;
  }
  .store-of-product {
    margin-left: 10px;
  }
  .title-list-pickup-product {
    padding-top: 16px;
    border-top: 1px solid black;
  }
  .reviewPagePrice {
    position: absolute;
    right: 0;
    top: 10px;
  }
  .toolTip {
    margin-left: 10px;
  }
`;

export default styles;
