import { css } from 'styled-components';

export default css`
  margin: 0 10px;
  .product-image-container {
    a {
      min-height: 185px;
      display: block;
    }
  }
  .container-price {
    text-align: left;
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: 0 ${props => props.theme.spacing.SM};
    .product-image-container {
      a {
        min-height: 267px;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: 0 ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    .product-image-container {
      a {
        min-height: 259px;
      }
    }
  }
`;
