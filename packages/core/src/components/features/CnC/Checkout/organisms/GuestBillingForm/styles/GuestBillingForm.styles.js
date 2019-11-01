import { css } from 'styled-components';

export default css`
  .paypal-complete-purchase {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    text-align: center;
  }
  .payment-paypal-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;
