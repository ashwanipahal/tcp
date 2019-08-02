import { css } from 'styled-components';

const styles = css`
  .reset-pwd {
    text-decoration: underline;
  }
  .align-center {
    display: flex;
    justify-content: center;
  }
  .parent-wrapper {
    padding: 40px 28px 60px;
  }
  .img-parent {
    border-bottom: 2px solid;
  }
  .my-rewards-img-wrapper {
    width: 192px;
  }
  .labels-wrapper {
    font-size: 13px;
    text-align: center;
    border-bottom: 2px solid;
    padding: 18px 0;
    .my-place-rewards {
      font-weight: bold;
      color: ${props => props.theme.colorPalette.gray[700]};
    }
    .spend-points {
      font-size: 14px;
      font-weight: 900;
      color: ${props => props.theme.colorPalette.gray[700]};
    }
  }
  .info-icon-img-wrapper {
    display: inline-block;
    width: 10px;
  }
  .position-relative {
    position: relative;
  }
  .hide-show {
    position: absolute;
    right: 0;
    width: 30px;
  }
  .show-hide-icons {
    top: 28px;
  }
  .confirm-pwd-hide-show {
    top: 45px;
  }
  .checkbox-hide-show {
    label {
      height: auto;
      text-decoration: underline;
    }
    input {
      display: none;
    }
  }
  .create-account-btn {
    padding: 20px 0 15px;
    button {
      cursor: pointer;
    }
  }
  .already-account {
    text-decoration: underline;
  }
  .TextBox__error {
    font-size: 12px;
    font-weight: bold;
  }
`;

export default styles;
