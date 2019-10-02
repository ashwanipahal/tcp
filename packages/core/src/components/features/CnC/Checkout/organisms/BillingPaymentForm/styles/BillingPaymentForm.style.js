import { css } from 'styled-components';

export default css`
  .cardDropdownHeading {
    top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
    position: relative;
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }
  .disable-drop-down {
    pointer-events: none;
  }
  .billing-payment-details {
    display: flex;
  }
  .billing-payment-edit {
    padding-top: 15px;
    padding-left: 25px;
  }
  .paymentMethodHeading {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    padding-top: 10px;
  }
  .cardImage-card-number {
    padding: 7px 10px;
  }
  .cardImage-img-wrapper {
    display: flex;
    margin-bottom: auto;
    border: 1px solid ${props => props.theme.colorPalette.gray[500]};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
    background-color: ${props => props.theme.colors.WHITE};
  }
  .default-payment {
    padding-top: 14px;
  }
  .cardImage-wrapper {
    display: flex;
  }
  .info-icon-img-wrapper {
    display: inline-block;
    width: 15px;
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
    top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    .billing-payment-card-info {
      margin: 0px;
    }
  }
  .cvvCode {
    width: 100px;
    bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    .TextBox__input {
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    }
    .TextBox__label {
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
      top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      font-size: ${props => props.theme.typography.fontSizes.fs10};
    }
    .warning-icon {
      width: ${props => props.theme.typography.fontSizes.fs36};
    }
  }

  .billing-payment-subHeading {
    padding-bottom: 14px;
  }
  .cvv-code-info {
    font-family: ${props => props.theme.typography.fonts.secondary};
  }
  && .tooltip-bubble {
    min-width: 238px;
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    .TCPModal__Content_Modal .custom-select-dropDownList {
      position: relative;
    }
    .TCPModal__Content_Modal .dropdownDivOverFlow {
      max-height: none;
    }
    .TCPModal__Content_Modal .dropDownListwrapper {
      border: 0px;
    }
    .TCPModal__Content_Modal .dropdownliBottomBorder {
      border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
      margin: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS}
        ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    }
    .TCPModal__Content_Modal .ulBorderWithLastRow li:last-child {
      border: none;
      padding: 0px;
      width: 95%;
    }
  }
  .hideOnMobile {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
  }
  .hideOnDesktop {
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .default-payment > label {
    width: 100%;
  }
  .default-payment .CheckBox__text {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  && .dropdownliBottomBorder {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    position: relative;
    border: 0px;
  }
  &&& .dropdownliBottomBorder::after {
    position: absolute;
    content: '';
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    width: 93%;
    transform: translateX(-50%);
    bottom: 2px;
    left: 50%;
  }
  .dropDownTop {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    position: absolute;
    width: 100%;
    height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    z-index: 1;
  }
  .dropDownBottom {
    background-image: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    position: absolute;
    width: 100%;
    height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    bottom: 58px;
    z-index: 1;
    margin-bottom: 6px;
  }

  && ul:last-child li:last-child::after {
    border-bottom: 0px;
  }
  && ul:last-child li:nth-child(1)::after {
    border-bottom: 0px;
  }
  .ulBorderWithLastRow li:last-child {
    padding: 0px ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .payment-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    border-top: 1px solid ${props => props.theme.colors.TEXT.DARKGRAY};
  }
  .payment-paypal-container {
    padding: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
  }
  .addCreditCardBtn {
    padding: 0px ${props => props.theme.spacing.ELEM_SPACING.XL};
    min-height: 42px;
  }
  .card-edit-buttons {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-bottom: 20px;

    .card-edit-button {
      height: 51px;
      width: 210px;
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    .card-edit-cancel {
      border: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
      background: ${props => props.theme.colors.WHITE};
      &:hover {
        background: ${props => props.theme.colors.WHITE};
      }
    }
    .card-edit-save {
      background: ${props => props.theme.colors.PRIMARY.BLUE};
      &:hover {
        background: ${props => props.theme.colors.PRIMARY.BLUE};
      }
    }
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .ulBorderWithLastRow li:last-child {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.SM}
        ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;
