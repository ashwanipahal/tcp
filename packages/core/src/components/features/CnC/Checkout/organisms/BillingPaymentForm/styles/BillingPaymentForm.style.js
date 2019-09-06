import { css } from 'styled-components';

export default css`
  .cardDropdownHeading {
    top: 25px;
    position: relative;
    font-size: 10px;
    font-weight: 800;
  }
  .billing-payment-details {
    display: flex;
  }
  .billing-payment-edit {
    padding-top: 15px;
    padding-left: 25px;
  }
  .paymentMethodHeading {
    font-size: 16px;
    font-weight: bold;
    padding-top: 10px;
  }
  .cardImage-card-number {
    padding: 7px 10px;
  }
  .cardImage-img-wrapper {
    display: flex;
    margin-bottom: auto;
    width: 47px;
    height: 30px;
    border: 1px solid ${props => props.theme.colorPalette.gray[500]};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
    background-color: ${props => props.theme.colors.WHITE};
  }
  .cardImage-wrapper {
    display: flex;
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
  @media ${props => props.theme.mediaQuery.smallMax} {
    .billing-payment-card-info {
      margin: 0px;
    }
  }
  .cvvCode {
    width: 90px;
    @media ${props => props.theme.mediaQuery.large} {
      width: 125px;
    }
  }
  .cvvCode .TextBox__input {
    background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  }
  .billing-payment-subHeading {
    padding-bottom: 14px;
  }
`;
