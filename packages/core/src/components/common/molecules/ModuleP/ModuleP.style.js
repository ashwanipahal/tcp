import { css } from 'styled-components';

export default css`
  .item-container-inner {
    height: ${props => (props.isPromoAvailable ? '391px' : '')};
    @media ${props => props.theme.mediaQuery.medium} {
      height: ${props => (props.isPromoAvailable ? '512px' : '')};
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: ${props => (props.isPromoAvailable ? '604px' : '')};
    }
  }

  margin: 0 10px;
  .product-image-container {
    height: 186px;
    width: 149px;
    a {
      min-height: 185px;
      display: block;
    }
  }
  .container-price {
    text-align: left;
    min-height: 50px;
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: 0 ${props => props.theme.spacing.SM};
    .product-image-container {
      a {
        min-height: 267px;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .product-image-container {
      height: 267px;
      width: 214px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: 0 ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    .product-image-container {
      height: 325px;
      width: 261px;
      a {
        min-height: 259px;
      }
    }
  }
`;
