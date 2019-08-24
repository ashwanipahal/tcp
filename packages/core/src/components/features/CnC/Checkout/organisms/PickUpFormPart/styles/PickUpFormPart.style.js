import { css } from 'styled-components';

const styles = css`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};

  .container {
    margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    min-height: 419px;
  }
  .TextBox__input {
    background: transparent;
  }
  .email-signup-container {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  }
  .emailSignupText {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }
  .pickupError {
    margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }
  .checkoutPickupForm {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .pickUpContact {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .pick-up-form-container,
  .mail-signup-container,
  .ickUpAlternate-container {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 45px;
    margin-top: 71px;
  }
  .updateButton {
    margin-left: 30px;
  }
`;

export default styles;
