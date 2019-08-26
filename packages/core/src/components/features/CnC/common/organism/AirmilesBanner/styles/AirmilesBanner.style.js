import { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};

  .coupon_form_container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.WHITE};
  }
  .circle-info-image {
    width: 15px;
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
