import { css } from 'styled-components';

export default css`
  .product-title {
    margin-bottom: 7px;
  }

  .container-price-bopis > span {
    margin-right: 5px;
  }

  .product-Price > span:first-child {
    margin-right: 14px;
  }

  .product-color,
  .product-values,
  .product-key {
    @media ${props => props.theme.mediaQuery.large} {
      display: inline;
    }
  }

  .product-Price > span:first-child,
  .product-color .product-key > span:first-child {
    margin-right: 14px;
  }

  .product-values .product-key:first-child > span {
    margin-right: 23px;

    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 5px;
    }
  }

  .product-values .product-key:last-child > span {
    margin-right: 25px;

    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 2px;
    }
  }
  .product-values .product-key {
    @media ${props => props.theme.mediaQuery.large} {
      padding: 0px 10px;
    }
  }

  .product-color .product-key {
    @media ${props => props.theme.mediaQuery.large} {
      padding-right: 10px;
    }
  }

  .product-color .product-key,
  .product-key:not(:last-child) {
    @media ${props => props.theme.mediaQuery.large} {
      border-right: 1px solid ${props => props.theme.colorPalette.gray[800]};
    }
  }

  .list-price {
    color: ${props => props.theme.colorPalette.red[600]};
  }
`;
