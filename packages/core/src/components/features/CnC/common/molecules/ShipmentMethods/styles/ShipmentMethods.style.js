import { css } from 'styled-components';

const styles = css`
  justify-content: flex-start;
  .radio-method {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 0;
    }
  }
  .estimated-shipping-rate {
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
      justify-content: flex-start;
    }
    .estimated-shipping-speed {
      font-style: italic;
    }
  }
`;

export default styles;
