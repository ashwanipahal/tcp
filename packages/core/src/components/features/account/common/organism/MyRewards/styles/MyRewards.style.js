import { css } from 'styled-components';

const styles = css`
  .my-rewards-heading {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }

  .no-rewards-msg {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }

  .shop-now-btn-wrapper {
    margin-right: 0;
  }

  .shop-now-btn {
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.xlarge} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    }
  }

  .anchor-wrapper {
    text-align: center;
  }

  .rewards-container {
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: 24px;

    @media ${props => props.theme.mediaQuery.medium} {
      grid-template-columns: repeat(2, calc(50% - 15px));
      grid-column-gap: 30px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      grid-template-columns: repeat(5, calc(20% - 24px));
    }
  }
`;

export default styles;
