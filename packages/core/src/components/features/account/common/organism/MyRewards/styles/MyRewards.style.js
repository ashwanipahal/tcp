import { css } from 'styled-components';

const styles = css`
  .my-rewards-heading {
    text-align: ${props => (props.view === 'all' ? 'left' : 'center')};
    margin-bottom: ${props =>
      props.view === 'all'
        ? props.theme.spacing.ELEM_SPACING.MED
        : props.theme.spacing.ELEM_SPACING.XL};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props =>
        props.view === 'all'
          ? props.theme.spacing.ELEM_SPACING.XL
          : props.theme.spacing.ELEM_SPACING.XXXL};
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-bottom: ${props =>
        props.view === 'all'
          ? props.theme.spacing.ELEM_SPACING.XL
          : props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .my-reward-styling {
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .no-rewards-msg {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
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
  }

  .rewards-container {
    display: -ms-grid;
    align-items: stretch;

    @media ${props => props.theme.mediaQuery.medium} {
      -ms-grid-column-gap: 30px;
      grid-column-gap: 30px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      -ms-grid-template-columns: calc(20% - 24px) calc(20% - 24px) calc(20% - 24px) calc(20% - 24px)
        calc(20% - 24px);
      grid-template-columns: repeat(5, calc(20% - 24px));
    }
  }
`;

export default styles;
