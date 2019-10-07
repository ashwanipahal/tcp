import { css } from 'styled-components';

const styles = css`
  .coupon_list {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
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
  }

  .rewards-header {
    text-align: left;
  }

  .couponsWrapperAccordian {
    .collapsible-header {
      background-color: ${props => props.theme.colorPalette.white};
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
      width: 108%;
      margin-left: -14px;
    }
    .collapsible-icon {
      top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;

export default styles;
