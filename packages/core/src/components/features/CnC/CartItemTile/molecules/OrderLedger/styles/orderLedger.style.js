// import styled from 'styled-components';
import { css } from 'styled-components';

const LedgerStyle = css`
  background-color: white;
  border: 1px solid black;
  padding: 23px 1px 32px;

  .rowMargin {
    margin-bottom: 8px;
  }
  .estimated-total {
    border-top: 1px solid black;
    padding-top: 10px;
  }
  .tax-total {
    padding-bottom: 7px;
  }

  .checkoutButton {
    font-weight: 800;
  }
`;

export default LedgerStyle;
