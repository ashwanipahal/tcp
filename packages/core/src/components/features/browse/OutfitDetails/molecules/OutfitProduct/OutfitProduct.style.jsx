import { css } from 'styled-components';

export default css`
  .tablet-image-section,
  .product-information {
    display: inline-block;
    width: 50%;
    vertical-align: top;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .tablet-image-section {
      width: 40%;
    }
    .product-information {
      width: 60%;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .tablet-image-section {
      display: none;
    }
  }
`;
