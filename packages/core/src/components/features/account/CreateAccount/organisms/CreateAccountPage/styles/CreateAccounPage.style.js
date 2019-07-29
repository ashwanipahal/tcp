import { css } from 'styled-components';

const styles = css`
  .padding-left-right-15 {
    padding: 0 45px;
  }
  .padding-bottom-10 {
    padding-bottom: 10px;
  }
  .padding-top-28 {
    padding-top: 28px;
  }
  .padding-top-40 {
    padding-top: 40px;
  }
  .reset-pwd {
    text-decoration: underline;
  }
  .align-center {
    display: flex;
    justify-content: center;
  }
  .row-form-wrapper {
    padding: 40px 28px 30px;
  }
  .img-parent {
    border-bottom: 2px solid;
  }
  .my-rewards-img-wrapper {
    width: 192px;
    padding-bottom: 30px;
  }
  .labels-wrapper {
    text-align: center;
    border-bottom: 2px solid;
    padding: 18px 0;
  }
  .info-icon-img-wrapper {
    display: inline-block;
    width: 10px;
  }
  .position-relative {
    position: relative;
  }
  .show-hide-icons {
    position: absolute;
    top: 28px;
    right: 20px;
  }
  .confirm-pwd-hide-show {
    position: absolute;
    top: 45px;
    right: 28px;
  }
  .checkbox-hide-show {
    label {
      height: auto;
    }
    input {
      display: none;
    }
  }
  .i-agree-checkbox {
    input {
      width: 33px;
    }
  }
  .create-account-btn {
    padding: 20px 0 15px;
  }
  .already-account {
    text-decoration: underline;
  }
`;

export default styles;
