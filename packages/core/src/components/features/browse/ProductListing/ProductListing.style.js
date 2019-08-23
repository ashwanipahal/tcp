import { css } from 'styled-components';

export default css`
  .bread-crumb,
  .promo-area,
  .filter-area,
  .product-list {
    background: #d8d8d8;
    padding: 20px 0;
    margin: 5px 0;
  }
  .bread-crumb,
  .product-list {
    background: white;
    display: flex;
  }
  .sidebar {
    display: none;
  }
  @media ${props => props.theme.mediaQuery.large} {
    .sidebar {
      display: flex;
    }
  }
`;
