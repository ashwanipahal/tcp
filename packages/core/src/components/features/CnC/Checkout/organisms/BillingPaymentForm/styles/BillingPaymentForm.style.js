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
    align-items: center;
  }
  .billing-payment-edit {
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
  .ulBorderWithLastRow li:last-child div {
    bottom: 13px;
  }
  .payment-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    border-top: 1px solid ${props => props.theme.colors.TEXT.DARKGRAY};
  }

  .venmo-container {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }

  .addCreditCardBtn {
    min-height: 42px;
  }
  .card-edit-buttons {
    display: flex;
    flex-direction: column;
    @media ${props => props.theme.mediaQuery.medium} {
      flex-direction: row;
      justify-content: flex-end;
      margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    }

    .card-edit-button {
      @media ${props => props.theme.mediaQuery.mediumMax} {
        height: 42px;
        width: 162px;
        margin-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
      }
      @media ${props => props.theme.mediaQuery.large} {
        height: 51px;
        width: 210px;
      }
    }

    .card-edit-cancel {
      margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
      margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
      border: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
      background: ${props => props.theme.colors.WHITE};
      &:hover {
        background: ${props => props.theme.colors.WHITE};
      }
      @media ${props => props.theme.mediaQuery.medium} {
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    .card-edit-save {
      display: none;
      background: ${props => props.theme.colorPalette.blue.C900};
      &:hover {
        background: ${props => props.theme.colorPalette.blue.C900};
      }
      @media ${props => props.theme.mediaQuery.medium} {
        display: inline-block;
      }
    }

    .card-edit-save-mob {
      @media ${props => props.theme.mediaQuery.medium} {
        display: none;
      }
    }
  }

  .edit-card-error {
    span {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }
  }

  .edit-card-error-container {
    display: flex;
    flex-direction: row-reverse;
    .edit-card-error {
      padding-top: 0;
      @media ${props => props.theme.mediaQuery.medium} {
        width: 356px;
        flex: none;
      }
      @media ${props => props.theme.mediaQuery.large} {
        width: 450px;
      }
      img {
        padding-left: 0;
      }
    }
  }
`;
