import { css } from 'styled-components';

export default css`
  .cardDropdownHeading {
    top: 25px;
    position: relative;
    font-size: 10px;
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
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
    .TextBox__input {
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
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
`;
