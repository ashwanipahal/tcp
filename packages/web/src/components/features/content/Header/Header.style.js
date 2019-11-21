import { css } from 'styled-components';

export default css`
  margin-bottom: 8px;

  @media ${props => props.theme.mediaQuery.large} {
    margin-bottom: 24px;
  }

  .header-middle-nav-bar {
    border-bottom: 1px solid ${props => props.theme.colorPalette.text.disabled};
  }

  .checkout-pages & {
    display: none;
  }

  .skip-main {
    padding: 6px;
    position: absolute;
    top: -40px;
    left: 0px;
    color: ${props => props.theme.colorPalette.white};
    border-right: 1px solid ${props => props.theme.colorPalette.white};
    border-bottom: 1px solid ${props => props.theme.colorPalette.white};
    border-bottom-right-radius: 8px;
    background: ${props => props.theme.colors.BRAND.PRIMARY};
    -webkit-transition: top 1s ease-out;
    transition: top 1s ease-out;
    z-index: ${props => props.theme.zindex.zEnlargedImage};
  }

  .skip-main:focus,
  .skip-main:active {
    position: absolute;
    left: 0px;
    top: 0px;
    outline-color: transparent;
    -webkit-transition: top 0.1s ease-in;
    transition: top 0.1s ease-in;
  }
`;
