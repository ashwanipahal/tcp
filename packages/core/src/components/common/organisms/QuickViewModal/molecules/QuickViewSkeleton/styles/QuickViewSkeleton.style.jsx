import { css } from 'styled-components';

export default css`
  padding: 10px 15px 20px 15px;
  background: ${props => props.theme.colors.WHITE};
  margin: 15px 0;
  .product-detail-skeleton-wrapper {
    display: flex;
    flex-direction: row;
  }
  .product-main-image {
    height: 325px;
    flex: 1;
    margin-right: 30px;
  }
  .product-overview-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 0;
  }
  .product-title {
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
  }
  .product-price {
    width: 70%;
    height: 50px;
    margin-bottom: 30px;
  }
  .product-color {
    width: 100%;
    height: 70px;
    margin-bottom: 20px;
  }
  .product-size {
    width: 100%;
    height: 70px;
    margin-bottom: 40px;
  }
  .product-add-to-bag {
    width: 70%;
    height: 50px;
  }
`;
