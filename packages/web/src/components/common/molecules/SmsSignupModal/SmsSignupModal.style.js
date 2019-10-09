import { css } from 'styled-components';

const SmsSignupModalStyle = css`
  .field-container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
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
  .button-container {
    width: 225px;
    box-sizing: border-box;
  }
  .async-error input {
    border-bottom: 1px solid ${props => props.theme.colors.NOTIFICATION.ERROR};
  }
  .async-success input {
    border-bottom: 1px solid ${props => props.theme.colors.TEXTBOX.SUCCESS_BORDER};
  }
  .terms-label {
    margin-top: 52px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .button-wrapper,
    .button-wrapper-form {
      width: 458px;
    }
    .button-container {
      bottom: 24px;
      width: 222px;
      box-sizing: border-box;
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
    .shop-button {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
`;

export default SmsSignupModalStyle;
