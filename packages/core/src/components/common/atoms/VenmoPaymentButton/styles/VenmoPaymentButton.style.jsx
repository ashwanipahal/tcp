import { css } from 'styled-components';

const styles = css`
  .venmo-container: {
    display: block;
    border: 1px dashed red;
  }
  .VenmoPaymentButton {
    background-color: ${props => props.theme.colors.VENMO};
    width: 100%;
    height: 50px;
  }
`;

export default styles;
