import { css } from 'styled-components';

const styles = css`
  .payment-method-box {
    border: 1px solid #9c9c9c;
    background: white;
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
  }
  .payment-method-box .input-radio-title {
    color: transparent !important;
  }
  & .credit-card .input-radio-title {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      font-size: 13px;
      font-weight: 800 !important;
      text-transform: uppercase;
    }
    color: black !important;
  }
  .payment-mothod-paypal-img {
    transform: scale(2);
    left: 21px;
    position: relative;
    top: -26px;
    @media ${props => props.theme.mediaQuery.medium} {
      left: 51px;
    }
  }
  .payment-mothod-venmo-img {
    transform: scale(2);
    left: 21px;
    position: relative;
    top: -26px;
    @media ${props => props.theme.mediaQuery.medium} {
      left: 51px;
    }
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    div[class='radio-button-checked'] {
      border-bottom: solid 2px black;
    }
  }
`;

export default styles;
