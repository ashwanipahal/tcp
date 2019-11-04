import { css } from 'styled-components';

export default css`
  .payment-paypal-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .paypal-complete-purchase {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    text-align: center;
  }
`;
