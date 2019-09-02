import { css } from 'styled-components';

export default css`
  box-sizing: border-box;
  height: calc(100% - 70px);

  .viewBagAndProduct {
    height: calc(100% - 146px);
    overflow-y: auto;
    border-top: 2px solid ${props => props.theme.colorPalette.gray[300]};
  }
  .mainWrapper {
    text-align: center;
    background-color: ${props => props.theme.colorPalette.gray['300']};
    height: auto;
    padding-right: 0;
    padding-left: 0;
    margin: 0;
    width: 100%;
  }

  .minibag-viewbag {
    border-bottom: solid 1px rgba(163, 162, 162, 0.5);
  }

  .deleteMsg {
    border: solid 2px ${props => props.theme.colors.NOTIFICATION.SUCCESS};
    text-align: left;
    padding: 10px;
    background: ${props => props.theme.colors.WHITE};
    display: flex;
    align-items: center;
    margin: 12px;
    .tick-icon-image {
      position: relative;
      top: 1px;
      right: 9px;
      height: 23px;
      width: 23px;
      padding-left: 10px;
    }
  }

  .subHeaderText {
    text-decoration: underline;
    vertical-align: middle;
    line-height: 28px;
  }
  .miniBagFooter {
    height: 146px;
    text-align: center;
    background-color: ${props => props.theme.colorPalette.gray['300']};
    padding-right: 0;
    padding-left: 0;
    border-bottom: ${props => props.theme.colorPalette.gray['600']};
    bottom: 0px;
    margin-bottom: 0px;
  }
  .subTotal {
    text-align: center;
    padding: 13px 0 13px 0;
  }
  .checkout-button {
    padding-top: 10px;
  }

  .checkout {
    height: 48px;
    margin-left: 10px;
    flex: 1;

    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-left: 0;
      width: 220px;
    }
  }
  .payPal-button {
    width: 220px;
  }
  .subTotalEmpty {
    text-align: center;
    padding: 13px 0 13px 0;
    bottom: 0px;
    margin-bottom: 0px;
  }
`;
