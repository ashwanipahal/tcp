import { css } from 'styled-components';

const styles = css`
  width: 100%;
  .container {
    margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  }
  .TextBox__input {
    background: transparent;
  }
  .email-signup-container {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  }
  .emailSignupText {
    margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  }
  .pickupError {
    margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }
  .checkoutPickupForm {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  }
`;

export default styles;
