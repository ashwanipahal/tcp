import { css } from 'styled-components';

const LedgerStyle = css`
  background-color: ${props => props.theme.colors.WHITE};
  padding: 23px 1px 21px;

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

  .order-ledger-header {
    text-align: left;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .hide-in-large-up {
      display: none;
    }
    .hideAccordian {
      display: none;
    }
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    width: 108%;
    margin-left: -14px;
    background-color: ${props => props.theme.colors.WHITE};
    .hide-in-medium-down {
      display: none;
    }
    .hideAccordian {
      display: none;
    }
  }

  .orderLedgerAccordian {
    .collapsible-header {
      background-color: ${props => props.theme.colorPalette.white};
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    .collapsible-icon {
      top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }
`;

export default LedgerStyle;
