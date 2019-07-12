import { css } from 'styled-components';

const SmsSignupModalStyle = css`
  .TCPModal__InnerContent {
    width: 375px;
    height: auto;
    padding: 0;
  }
  .field-container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    label {
      height: 40px;
    }
  }
  .button-wrapper {
    margin-top: 89px;
    background: #e2ecf3;
  }
  .join-button {
    margin: 21px auto;
    width: 66.66%;
    display: flex;
    justify-content: center;
  }
  .terms-label {
    margin-top: 52px;
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

export default SmsSignupModalStyle;
