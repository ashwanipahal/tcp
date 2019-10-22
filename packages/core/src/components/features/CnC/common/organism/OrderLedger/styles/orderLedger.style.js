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

  @media ${props => props.theme.mediaQuery.smallMax} {
    background-color: ${props => props.theme.colors.WHITE};
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

  .review-submit-container {
    display: flex;
    flex-direction: column;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    .review-submit-button {
      flex: 1;
    }
    .submit-disclaimer {
      font-family: ${props => props.theme.typography.fonts.secondary};
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;
      color: ${props => props.theme.colorPalette.gray[800]};
      text-align: center;
      @media ${props => props.theme.mediaQuery.medium} {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
        margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
        margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
      @media ${props => props.theme.mediaQuery.large} {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
        margin-left: 0;
        margin-right: 0;
      }
    }
    .submit-disclaimer-link {
      display: inline-block;
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    }
  }
`;

export default LedgerStyle;
