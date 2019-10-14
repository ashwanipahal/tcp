import { css } from 'styled-components';

const styles = css`
  .coupon_list {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .alignTop.alignTop {
    top: 15px;
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
    .hide-in-medium-down {
      display: none;
    }
    .hideAccordian {
      display: none;
    }
    .coupon_list {
      margin-left: 14px;
      margin-right: 14px;
    }
  }

  .rewards-header {
    text-align: left;
  }

  .couponsWrapperAccordian {
    margin-left: -14px;
    margin-right: -14px;
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

export default styles;
