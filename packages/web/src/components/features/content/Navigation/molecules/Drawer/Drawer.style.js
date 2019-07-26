import { css } from 'styled-components';

export default css`
  @-webkit-keyframes slideIn {
    0% {
      transform: translateX(-900px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @-moz-keyframes slideIn {
    0% {
      transform: translateX(-900px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes slideIn {
    0% {
      transform: translateX(-900px);
    }
    100% {
      transform: translateX(0);
    }
  }
  .tcp-drawer-overlay {
    background: ${props => props.theme.colorPalette.black};
    position: fixed;
    z-index: 900;
    height: 100vh;
    opacity: 0.6;
    width: 100vw;
  }
  .tcp-drawer {
    display: none;
  }
  .tcp-drawer__isOpen {
    display: block;
    position: fixed;
    z-index: 999;
  }
  .tcp-drawer-content {
    width: ${props => props.width.small || `100%`};
    background: ${props => props.theme.colorPalette.white};
  }
  .display-small-none {
    display: none;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .tcp-drawer-content {
      width: ${props => props.width.medium || `100%`};
    }
    .display-small-none {
      display: block;
    }
    .display-medium-none {
      display: none;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .tcp-drawer-content {
      width: ${props => props.width.large || `100%`};
      background: none;
    }
    .display-medium-none {
      display: block;
    }
    .display-large-none {
      display: none;
    }
  }
`;
