import { css } from 'styled-components';

const styles = css`
  .bordered {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.BLUE};
  }

  .logo {
    width: 192px;
  }
  .signuptext {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .checkout-border {
    width: 40%;
    margin: 0 auto;
    border-bottom: 1px solid ${props => props.theme.colors.TEXT.DARKERBLUE};
  }
`;

export default styles;
