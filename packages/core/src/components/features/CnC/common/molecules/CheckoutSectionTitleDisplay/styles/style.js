import { css } from 'styled-components';

const styles = css`
  width: 100%;
  margin-top: 51px;
  @media ${props => props.theme.mediaQuery.medium} {
    margin-top: 43px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  }
  .checkoutSectionTitle {
    margin-left: 0px;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    border-radius: 0.5px;
    border-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid
      ${props => props.theme.colorPalette.black};
  }
`;

export default styles;
