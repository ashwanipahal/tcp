import { css } from 'styled-components';

const styles = css`
  .new_gift_card_button {
    background-color: ${props => props.theme.colors.BLACK};
    color: ${props => props.theme.colors.WHITE};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
  }
  .headsUpMsgBoldTitle {
    font-family: ${props => props.theme.typography.fonts.secondaryFontSemilBoldFamily};
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .gift-addgiftcard-container {
    .TextBox__input {
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    }
  }
  .error-box {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    color: ${props => props.theme.colors.NOTIFICATION.ERROR};
    border: 1px solid ${props => props.theme.colors.NOTIFICATION.ERROR};
    text-align: center;
    display: block;
    position: relative;
    margin: 0 auto 6px;
  }

  .error-box .error-icon {
    font-size: 0;
    position: absolute;
    top: -${props => props.theme.spacing.ELEM_SPACING.SM};
    left: calc(50% - 11px);
    padding: 3px;
    display: inline-block;
    background: transparent url(/static/images/circle-alert-fill.svg) no-repeat 0 0;
    background-size: contain;
    border: none;
    height: 14px;
    width: 13px;
  }

  && .CheckBox__text {
    display: inline-block;
    vertical-align: bottom;
  }
  .savetoaccount > label {
    width: 100%;
  }

  && .card__btn > button,
  && .card__btn--medium > button,
  .new_gift_card_button,
  .error-box {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
      ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }

  && .card__btn--medium {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .recaptcha {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      transform: scale(0.7);
      position: relative;
      left: -31px;
      margin-top: -25px;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      transform: scale(0.9);
      position: relative;
      left: -5px;
      margin-top: -15px;
    }
  }
  .cardPin .TextBox__label,
  .giftCardNumber .TextBox__label {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
  }
  input:not([value='']) ~ .TextBox__label {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
`;

export default styles;
