import { css } from 'styled-components';

const EmailSignupModalStyle = css`
  .TCPModal__InnerContent {
    width: 375px;
    padding: 0 !important;
  }
  .sign-up__label {
    padding: 109px 0 4px;
  }
  .thank-you__label {
    padding: 219px 0 4px;
  }
  .offer-type__label,
  .confirmation__label {
    ::after {
      content: '';
      height: 2px;
      width: 100px;
      background: #439ad4;
      margin: 19px auto 60px;
      display: block;
    }
  }
  .confirmation__label {
    margin: 19px auto 60px;
  }
  .flash-text {
    span,
    p {
      color: #4b9fdd;
    }
    p {
      font-size: 107px;
      line-height: 107px;
    }
  }
  .get-text,
  .ten-text {
    font-size: 66px;
  }
  .dollar-text: {
    vertical-align: super;
  }
  .field-container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    label {
      height: 40px;
      margin-bottom: 52px;
    }
  }
  .button-wrapper {
    margin-top: 89px;
    background: #e2ecf3;
    display: flex;
  }
  .join-button {
    margin: 21px auto;
    width: 66.66%;
  }
  .async-error input {
    border-bottom: 1px solid #c8102e;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .TCPModal__InnerContent {
      width: 458px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .TCPModal__InnerContent {
      width: 851px;
    }
    .wrapper {
      margin: 0;
    }
    .sign-up__label {
      padding: 32px 0 4px;
    }
    .offer-type__label {
      ::after {
        margin-bottom: 0;
      }
    }
    .field-container {
      padding-top: 0;
    }
    .button-row {
      display: none;
    }
    .join-button {
      margin: 24px auto;
      width: 30%;
    }
    .button-wrapper__large {
      display: flex;
    }
  }
`;

export default EmailSignupModalStyle;
