import { css } from 'styled-components';

export default css`
  .placeholder div {
    background: #d8d8d8;
    padding: 10px 0;
    margin-bottom: 5px;
    text-align: center;
  }
  .product-detail-section {
    flex: 1;
  }
  .product-image-wrapper {
    margin-right: 0;
  }
  .product-detail-image-wrapper {
    margin-bottom: 8px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .product-image-wrapper {
      margin-right: 30px;
    }
    .product-detail-image-wrapper {
      margin-bottom: 11px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .product-image-wrapper {
      margin-right: 0;
    }
    .product-detail-image-wrapper {
      margin-bottom: 27px;
    }
  }
`;
