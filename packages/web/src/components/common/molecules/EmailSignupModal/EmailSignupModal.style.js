import { css } from 'styled-components';

const EmailSignupModalStyle = css`
  .field-container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
  .field-label {
    height: 40px;
  }
  .button-wrapper,
  .button-wrapper-form {
    background: ${props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS};
    margin: 89px -15px 0 0;
    width: 375px;
    display: flex;
    justify-content: center;
    padding: 21px 0;
  }
  .button-wrapper-form {
    margin: 89px -15px 0;
  }
  .terms-label {
    margin-top: 52px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .button-wrapper,
    .button-wrapper-form {
      width: 458px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .field-container {
      padding-top: 0;
    }
    .button-wrapper,
    .button-wrapper-form {
      margin: 24px auto 20px;
      background: none;
      padding: 0;
    }
    .img-wrapper {
      display: flex;
    }
    .button-container {
      position: absolute;
      bottom: 24px;
    }
    .shop-button {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }

  .email-modal-signup-image {
    max-width: 300px;
  }
`;

export default EmailSignupModalStyle;
