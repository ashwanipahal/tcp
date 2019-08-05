// import styled from 'styled-components';
import { css } from 'styled-components';

const LedgerStyle = css`
  background-color: white;
  padding: 23px 1px 32px;

  .rowMargin {
    margin-bottom: 8px;
  }
  .estimated-total {
    padding-top: 10px;
  }
  .tax-total {
    padding-bottom: 7px;
    border-bottom: 1px solid black;
  }
  .circle-info-image {
    width: 15px;
    height: 15px;
    position: relative;
    left: 5px;
    top: 2px;
  }
`;

export default LedgerStyle;
