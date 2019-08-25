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
    border-bottom: 1px solid;
  }
  .my-rewards-img-wrapper {
    width: 192px;
  }
  .labels-wrapper {
    padding-left: 20px;
    padding-right: 20px;
  }

  .spend-points {
    font-weight: bold;
    color: ${props => props.theme.colorPalette.gray[700]};
  }

  .my-place-rewards {
    font-weight: bold;
    color: ${props => props.theme.colorPalette.gray[700]};
  }

  .signed-up-in-store {
    border-bottom: 1px solid;
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
    top: 3px;
  }
  .confirm-pwd-hide-show {
    top: 24px;
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
  .TextBox__error,
  .Checkbox__error {
    font-size: 12px;
    font-weight: bold;
  }
`;

export default styles;
