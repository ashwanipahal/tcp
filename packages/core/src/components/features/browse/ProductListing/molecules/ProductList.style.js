import { css } from 'styled-components';

export default css`
  display: flex;
  flex-wrap: wrap;
  .product-tile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    margin: 0 0 63px 0;
    width: calc(33.33% - 24px);
    @media only screen and (min-width: 1350px) {
      width: calc(25% - 24px);
    }
  }
`;
