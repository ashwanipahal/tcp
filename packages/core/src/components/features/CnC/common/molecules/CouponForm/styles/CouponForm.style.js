import { css } from 'styled-components';

export default css`
  margin-top: 15px;
  .coupon_form_container {
    padding: 18px 16px 12px 14px;
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.WHITE};

    .coupon_form_heading {
      margin: 0px;
      margin-bottom: 18px;
    }
    .coupon_need_help_link {
      padding-left: 12px;
      text-decoration: underline;
      cursor: pointer;
    }

    .coupon_submit_form {
      display: flex;
      flex: 1;
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        flex-direction: column;
      }
    }

    .input-fields-wrapper {
      padding-right: 8px;
      flex: 1;

      input {
        height: 16px;
        margin-bottom: 0;
        margin-top: 1px;
      }
    }

    .coupon_submit_button {
      height: 42px;
      width: 102px;
      margin-top: 8px;
      cursor: default;
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        width: 162px;
        align-self: center;
        margin-top: 18px;
      }
      @media ${props => props.theme.mediaQuery.large} {
        height: 51px;
        width: 120px;
        margin-top: 0;
      }
    }

    .success__checkmark {
      visibility: hidden;
    }
  }
`;
