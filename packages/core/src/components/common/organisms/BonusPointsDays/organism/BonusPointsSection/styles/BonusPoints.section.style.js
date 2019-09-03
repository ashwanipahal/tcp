import { css } from 'styled-components';

const styles = css`
  text-align: center;
  .apply-any-day-msg {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .availability-msg {
    display: flex;
    justify-content: center;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  .details-link {
    display: block;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .hide-in-large-up {
      display: none;
    }
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    .hide-in-medium-down {
      display: none;
    }
  }
  .accordian-header-text {
    text-align: center;
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }
  .bonus-lbl {
    color: ${props => props.theme.colorPalette.orange[800]};
  }
  .rewards-points-lbl {
    color: ${props => props.theme.colorPalette.primary.main};
  }
  .rewards_day-lbl {
    color: ${props => props.theme.colorPalette.pink[500]};
  }
`;

export default styles;
