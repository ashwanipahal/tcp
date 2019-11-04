import { css } from 'styled-components';

export default css`
  margin: 0 10px;
  &.price-only {
    .added-to-bag {
      display: none;
    }
  }
  .top-badge-container,
  .extended-sizes-text,
  .fav-icon-wrapper,
  .product-title-container,
  .color-chips-container,
  .loyalty-text-container {
    display: none;
  }
  .product-image-container {
    a {
      min-height: 185px;
      overflow: hidden;
      position: relative;
      display: block;
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
  .container-price {
    text-align: left;
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: 0 12px;
    .product-image-container {
      a {
        min-height: 267px;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: 0 20px;
    .product-image-container {
      a {
        min-height: 259px;
      }
    }
  }
`;
