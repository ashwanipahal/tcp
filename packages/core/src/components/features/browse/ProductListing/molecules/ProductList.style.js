import { css } from 'styled-components';

export default css`
  display: flex;
  flex-wrap: wrap;
  .product-tile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 10px;
    margin: 0 0 6px 0;
    width: calc(50% - 20px);
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 25px 0;
      padding: 12px 32px;
      width: calc(33.33% - 64px);
    }
    @media only screen and (min-width: 1350px) {
      margin: 0 0 19px 0;
      padding: 12px 21px;
      width: calc(25% - 42px);
    }
  }
`;
