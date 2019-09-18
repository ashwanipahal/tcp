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
`;

export default styles;
