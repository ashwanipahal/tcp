import { css } from 'styled-components';

export default css`
  padding: 10px 15px 20px 15px;
  background: ${props => props.theme.colors.WHITE};
  margin: 15px 0;
  .product-detail-skeleton-wrapper {
    display: flex;
    flex-direction: column;
  }
  .product-main-image {
    height: 436px;
    width: 100%;
    margin-bottom: 40px;
    margin-right: 0;
  }
  .product-overview-wrapper {
    width: 100%;
    display: flex;
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
    width: 100%;
    height: 50px;
  }
  .product-image {
    margin-right: 20px;
    margin-bottom: 20px;
    height: 50px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .product-detail-skeleton-wrapper {
      display: flex;
      flex-direction: row;
    }
    .product-main-image {
      height: 703px;
      flex: 1;
      margin-right: 5%;
    }
    .product-overview-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 2%;
    }
    .product-overview-detail-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .product-image {
      flex: 1;
      display: flex;
      height: 261px;
      margin-right: 20px;
    }
    .product-title-price-wrapper {
      flex: 2;
      display: flex;
      flex-direction: column;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .product-detail-skeleton-wrapper {
      display: flex;
      flex-direction: row;
    }
    .product-main-image {
      height: 703px;
      flex: 1;
      margin-right: 5%;
    }
    .product-overview-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 2%;
    }
    .product-overview-detail-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .product-image {
      flex: 1;
      display: flex;
      height: 261px;
      margin-right: 20px;
    }
    .product-title-price-wrapper {
      flex: 2;
      display: flex;
      flex-direction: column;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
