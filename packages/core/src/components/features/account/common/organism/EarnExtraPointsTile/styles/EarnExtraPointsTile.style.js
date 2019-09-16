import { css } from 'styled-components';

const styles = css`
  .earnExtraPointsWrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 0px;
      margin-right: 0px;
    }
  }
  .slick-dots {
    position: initial;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;

export default styles;
