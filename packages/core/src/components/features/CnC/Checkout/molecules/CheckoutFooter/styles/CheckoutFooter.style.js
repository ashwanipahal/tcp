import { css } from 'styled-components';

const styles = css`
  border-top: 1px solid ${props => props.theme.colors.BLACK};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .back-link {
    margin-top: ;
  }
  .back-link-image {
    width: ${props => props.theme.spacing.ELEM_SPACING.XS};
    height: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }
  .footer-button {
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    color: ${props => props.theme.colors.WHITE};
  }
`;

export default styles;
