import { css } from 'styled-components';

const LedgerStyle = css`
  background-color: ${props => props.theme.colors.WHITE};
  padding: 23px 1px 32px;

  .rowMargin {
    margin-bottom: 8px;
  }
  .estimated-total {
    padding-top: 10px;
  }
  .tax-total {
    padding-bottom: 7px;
    border-bottom: 1px solid ${props => props.theme.colors.BLACK};
  }
  .circle-info-image {
    width: 15px;
    height: 15px;
    position: relative;
    left: 5px;
    top: 2px;
  }
  .tooltip-bubble {
    left: 100%;
    ::after {
      right: 42%;
    }

    ::before {
      right: 39%;
    }
  }
`;

export default LedgerStyle;
