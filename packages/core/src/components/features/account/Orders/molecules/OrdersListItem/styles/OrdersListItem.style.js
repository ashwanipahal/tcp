import { css } from 'styled-components';

const styles = css`
  .order-total {
    text-align: left;
    @media ${props => props.theme.mediaQuery.medium} {
      text-align: right;
    }
  }

  .order-item-header {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .order-item-value {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .order-item-bottom {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default styles;
