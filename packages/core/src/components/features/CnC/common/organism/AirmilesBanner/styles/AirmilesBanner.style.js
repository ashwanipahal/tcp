import { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};

  .coupon_form_container {
    padding: 18px 16px 12px 14px;
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.WHITE};
  }
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
      margin-top: 1px;
    }
  }
  .airmilesBannerInput {
    position: relative;
  }
  .coupon_submit_button {
    width: 15px;
    margin-top: 8px;
    cursor: center;

    @media ${props => props.theme.mediaQuery.large} {
      height: 51px;
      width: 100px;
      margin-top: 0;
    }
  }
`;

export default styles;
