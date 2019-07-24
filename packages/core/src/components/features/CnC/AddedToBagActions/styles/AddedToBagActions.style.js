import { css } from 'styled-components';

const CtaStyle = css`
  display: block;
  margin: 10px 0;
  .check-out-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .view-bag {
    color: white;
    width: inherit;
    background-color: #1a1a1a;
    height: 48px;
    font-size: 14px;
    font-weight: 800;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
  }
  .checkout-button {
    padding-top: 10px;
  }
  .checkout {
    color: white;
    font-size: 14px;
    font-weight: 800;
    height: 48px;
    width: 100%;
    background-color: #2e6a91;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
  }
`;
export default CtaStyle;
