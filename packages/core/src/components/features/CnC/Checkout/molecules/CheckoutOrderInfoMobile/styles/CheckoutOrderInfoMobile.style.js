import { css } from 'styled-components';

const styles = css`
  @media ${props => props.theme.mediaQuery.medium} {
    display: none;
  }
  .order-summary {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .order-summary {
      padding: 0;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .venmo-payment-method-wrapper {
    display: flex;
    flex-direction: row;
    text-align: left;
  }

  .venmo-paid-text {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
