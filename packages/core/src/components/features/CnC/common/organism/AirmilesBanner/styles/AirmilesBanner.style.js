import { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};

  .coupon_form_container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.WHITE};
  }
  .airmilesRow {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
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
  .editButton {
    margin-top: 26px;
  }
  .editCursor {
    margin-top: 2px;
    cursor: pointer;
  }
  .input-fields-wrapper {
    flex: 1;

    input {
      height: 16px;
      margin-top: 1px;
    }
  }
  .airmilesBannerInput {
    position: relative;
  }
  .airmileBannerTooltip {
    position: absolute;
    right: -10px;
    width: 30px;
    top: 27px;
  }
  .info-icon-img-wrapper {
    display: inline-block;
    width: 15px;
  }
  .coupon_submit_button {
    display: flex;
    position: absolute;
    width: 15px;
    top: 25px;
    right: 10px;

    @media ${props => props.theme.mediaQuery.large} {
      display: flex;
      position: absolute;
      width: 15px;
      top: 25px;
      right: 10px;
    }
  }
`;

export default styles;
