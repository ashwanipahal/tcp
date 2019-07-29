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
    position: absolute;
    z-index: 900;
    height: 100%;
    opacity: 0.6;
    width: 100%;
  }
  .tcp-drawer {
    display: none;
  }
  .tcp-drawer__isOpen {
    display: block;
    position: absolute;
    z-index: 999;
    top: ${props => (props.position && props.position.top) || 0};
    left: ${props => (props.position && props.position.left) || 0};
    width: 100%;
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
