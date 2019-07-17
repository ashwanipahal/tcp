import { css } from 'styled-components';

export default css`
  text-align: center;
  .promo-text {
    display: block;
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline;
    }
  }
`;
