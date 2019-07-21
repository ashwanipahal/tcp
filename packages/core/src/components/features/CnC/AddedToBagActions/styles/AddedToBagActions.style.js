/* stylelint-disable */
import { css } from 'styled-components';

const CTAStyle = css`
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
    background-color: #2e6a91;
    width: 100%;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    @media ${props => props.theme.mediaQuery.small} {
      width: inherit;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      width: inherit;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: inherit;
    }
  }
`;
export default CTAStyle;
