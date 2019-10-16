import { css } from 'styled-components';

const SmsSignupModalStyle = css`
  .field-container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
  .button-wrapper,
  .button-wrapper-form {
    background: ${props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS};
    margin: 89px -15px 0 0;
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
  .alignRight {
    right: 14px;
    @media ${props => props.theme.mediaQuery.medium} {
      right: 16px;
    }
  }
  .alignTop {
    top: 14px;
    @media ${props => props.theme.mediaQuery.medium} {
      top: 16px;
    }
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .button-wrapper {
      position: absolute;
      width: 100%;
      bottom: 0;
    }
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
      margin: 24px auto 0;
      background: none;
      padding: 0;
    }
    .img-wrapper {
      display: flex;
      width: 300px;
      margin-right: 0;
      height: 620px;
    }
    .img-wrapper + div {
      width: calc(100% - 300px);
    }
    .shop-button {
      position: absolute;
      width: 222px;
      bottom: 24px;
    }
  }
`;

export default SmsSignupModalStyle;
