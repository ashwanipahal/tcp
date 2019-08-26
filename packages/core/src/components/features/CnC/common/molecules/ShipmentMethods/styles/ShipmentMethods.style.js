import { css } from 'styled-components';

const styles = css`
  justify-content: center;
  .estimated-shipping-rate {
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
      justify-content: flex-start;
    }
    :nth-of-type(2) {
      font-style: italic;
    }
  }
`;

export default styles;
