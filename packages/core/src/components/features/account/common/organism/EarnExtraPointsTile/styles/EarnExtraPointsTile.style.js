import { css } from 'styled-components';

const styles = css`
  .earnExtraPointsWrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 0px;
      margin-right: 0px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }
  .slick-dots {
    position: initial;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  .slick-disabled {
    opacity: 0.5;
    cursor: default;
  }
  .onAccountOverview {
    max-width: 285px;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};

    @media ${props => props.theme.mediaQuery.large} {
      max-width: 336px;
      margin-left: 0;
      margin-right: 0;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      max-width: 318px;
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

export default styles;
