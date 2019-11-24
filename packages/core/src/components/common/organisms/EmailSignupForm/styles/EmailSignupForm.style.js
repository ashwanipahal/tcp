import { css } from 'styled-components';

const styles = css`
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

    .email-signup-second-brand {
      padding-top: 25px;
    }

    .CheckBox__text {
      margin-top: 6px;
    }
  }
  .field-label {
    height: 40px;
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
    margin: 89px -14px 0;
    width: 100vw;
  }
  .button-container {
    width: 225px;
    box-sizing: border-box;
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
      ${props =>
        props.noModal
          ? `
        margin-right: 0;
        margin-left: 0;
      `
          : ''}
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
  .email-modal-signup-image {
    max-width: 300px;
  }
`;

export default styles;
