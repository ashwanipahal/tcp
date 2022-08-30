import { css } from 'styled-components';

export default css`
  ${props =>
    props.noModal
      ? `
    @media ${props.theme.mediaQuery.large} {
      padding: 0 15px;
    }
  `
      : ``}
  .field-container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};

    .phone-signup-second-brand {
      padding-top: 25px;
    }

    .CheckBox__text {
      margin-top: 6px;
    }
  }
  .sms-signup-content {
    position: relative;
  }
  .full-height {
    height: 100%;
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
    margin-top: 89px;
    width: 100vw;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin: 89px -14px 0;
    }
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
    margin-top: 32px;
  }
  .alignRight {
    right: 14px;
    @media ${props => props.theme.mediaQuery.medium} {
      right: 16px;
    }
  }
  .alignTop {
    top: 14px;
    z-index: 1;
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
      width: ${props => (props.noModal ? '100%' : '457px')};
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
    .button-wrapper {
      bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      width: 100%;
      position: absolute;
    }
    .button-wrapper,
    .button-wrapper-form {
      margin: 24px auto 0;
      background: none;
      padding: 0;
    }
    .img-wrapper {
      display: flex;
      ${props => (props.noModal ? `` : `width: 300px`)};
      margin-right: 0;
      height: 645px;
    }
    ${props =>
      props.noModal
        ? ``
        : `
      .img-wrapper + div {
        width: calc(100% - 300px);
      }
    `}
    .shop-button {
      bottom: 0;
      width: 100%;
    }
  }
`;
