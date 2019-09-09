import { css } from 'styled-components';

const styles = css`
  .payment-method-box {
    border: 1px solid ${props => props.theme.colorPalette.gray[600]};
    background: ${props => props.theme.colors.WHITE};
    height: 51px;
    padding: 8px;
    box-sizing: border-box;
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin: 0px;
      height: 42px;
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
      height: auto;
      border-radius: 0px;
      border: 0px;
      text-align: center;
    }
    ::after {
      content: '§';
      display: inline-block;
      height: 10px;
      width: 10px;
      vertical-align: top;
      font-size: ${props => props.theme.fonts.fontSize.heading.large.h6}px;
      background: transparent url('/static/images/paypal.svg') no-repeat 0 0;
    }
  }
  .payment-method-box .input-radio-title {
    color: transparent !important;
  }
  & .credit-card .input-radio-title {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
      text-transform: uppercase;
    }
    color: ${props => props.theme.colors.BLACK} !important;
  }
  .payment-mothod-paypal-img {
    left: 21px;
    position: relative;
    top: -26px;
    @media ${props => props.theme.mediaQuery.medium} {
      left: 51px;
    }
  }
  .payment-mothod-venmo-img {
    left: 21px;
    position: relative;
    top: -26px;
    @media ${props => props.theme.mediaQuery.medium} {
      left: 51px;
    }
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    div[class='radio-button-checked'] {
      border-bottom: solid ${props => props.theme.spacing.ELEM_SPACING.XXXS}
        ${props => props.theme.colors.BLACK};
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
  @media ${props => props.theme.mediaQuery.large} {
    .payment-method-box:nth-child(2) {
      margin-right: 0;
    }
  }
`;

export default styles;
