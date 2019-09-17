import { css } from 'styled-components';

const styles = css`
  .payment-method-box {
    box-sizing: border-box;
    border: 1px solid ${props => props.theme.colorPalette.gray[600]};
    background: ${props => props.theme.colors.WHITE};
    padding: 11px 8px;
    margin-right: 30px;
    width: calc(50% - ${props => props.theme.spacing.ELEM_SPACING.LRG});
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin: 0px;
      padding: 5px 0px;
      width: 33%;
    }
  }
  .payment-method-box .radio-button-checked {
    top: 8px;
  }
  .payment-method-box .radio-button {
    top: 7px;
  }

  .payment-method-box > label {
    padding-top: 5px;
    z-index: 1;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      background-color: transparent;
      border-radius: 0px;
      border: 0px;
      text-align: center;
    }
  }
  .payment-method-paypal-img > label::after {
    content: '';
    display: inline-block;
    vertical-align: top;
    font-size: ${props => props.theme.fonts.fontSize.heading.large.h6}px;
    background: url('/static/images/paypal.svg') no-repeat -9px -21px;
    background-size: 88px 64px;
    width: 71px;
    height: 22px;
  }
  .payment-method-venmo-img > label::after {
    content: '';
    display: inline-block;
    vertical-align: top;
    font-size: ${props => props.theme.fonts.fontSize.heading.large.h6}px;
    background: url('/static/images/venmo.svg') no-repeat -9px -21px;
    background-size: 88px 64px;
    width: 71px;
    height: 22px;
  }

  && .credit-card .input-radio-title {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
      text-transform: uppercase;
      position: relative;
      top: 3px;
    }
    color: ${props => props.theme.colors.BLACK};
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    div[class='radio-button-checked'] {
      border-bottom: solid ${props => props.theme.spacing.ELEM_SPACING.XXXS}
        ${props => props.theme.colors.BLACK};
    }
    .radio-button-checked + .input-radio-title {
      color: ${props => props.theme.colors.BLACK};
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
  @media ${props => props.theme.mediaQuery.large}, ${props => props.theme.mediaQuery.medium} {
    .payment-method-box:nth-child(2) {
      margin-right: 0;
    }
  }
`;

export default styles;
