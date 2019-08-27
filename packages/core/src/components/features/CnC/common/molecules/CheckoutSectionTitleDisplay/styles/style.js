import { css } from 'styled-components';

const styles = css`
  width: 100%;
  .checkoutSectionTitle {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-left: 0px;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    border-radius: 0.5px;
    border-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid
      ${props => props.theme.colorPalette.black};
  }
`;

export default styles;
