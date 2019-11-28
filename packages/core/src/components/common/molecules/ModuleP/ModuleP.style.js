import { css } from 'styled-components';

export default css`
  .item-container-inner {
    height: ${props => (props.isPromoAvailable ? '405px' : '385px')};
    @media ${props => props.theme.mediaQuery.medium} {
      height: ${props => (props.isPromoAvailable ? '505px' : '485px')};
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: ${props => (props.isPromoAvailable ? '577px' : '557px')};
    }
  }

  margin: 0 10px;
  .product-image-container {
    height: auto;
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
      height: auto;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: 0 ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    .product-image-container {
      height: auto;
      a {
        min-height: 259px;
      }
    }
  }
`;
