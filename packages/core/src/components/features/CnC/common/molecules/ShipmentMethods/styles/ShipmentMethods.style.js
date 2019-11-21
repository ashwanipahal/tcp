import { css } from 'styled-components';

const styles = css`
  justify-content: flex-start;
  .radio-method {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 0;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: calc(33.33% - 6px);
      margin-right: 6px;
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
  .estimated-shipping-size {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding: 4px 0px;
    }
  }
`;

export default styles;
