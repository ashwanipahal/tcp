import { css } from 'styled-components';

export default css`
  padding: 10px 15px 20px 15px;
  background: ${props => props.theme.colors.WHITE};
  margin: 15px 0;
  .product-detail-skeleton-wrapper {
    display: flex;
    flex-direction: column;
  }
  .thumbnail-list-wrapper {
    display: none;
  }
  .thumbnail-list {
    margin-bottom: 10px;
    height: 110px;
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
    width: 70%;
    height: 50px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .product-detail-skeleton-wrapper {
      display: flex;
      flex-direction: row;
    }
    .thumbnail-list-wrapper {
      display: none;
    }
    .product-main-image {
      height: 436px;
      width: 45%;
      margin-right: 2%;
    }
    .product-overview-wrapper {
      width: 45%;
      display: flex;
      flex-direction: column;
      margin-left: 2%;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .product-detail-skeleton-wrapper {
      display: flex;
      flex-direction: row;
    }
    .thumbnail-list-wrapper {
      width: 8%;
      display: flex;
      flex-direction: column;
      margin-right: 5%;
    }
    .product-main-image {
      height: 703px;
      width: 40%;
      margin-right: 5%;
    }
    .product-overview-wrapper {
      width: 36%;
      display: flex;
      flex-direction: column;
      margin-right: 2%;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
