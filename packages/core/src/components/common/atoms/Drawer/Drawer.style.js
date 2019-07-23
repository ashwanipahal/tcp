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
  &.tcp-drawer {
    display: none;
  }
  &.tcp-drawer-overlay {
    background: black;
    position: fixed;
    z-index: 900;
    height: 100vh;
    opacity: 0.6;
    width: 100vw;
  }
  &.tcp-drawer__isOpen {
    display: block;
    position: fixed;
    z-index: 999;
  }
  .tcp-drawer-content {
    width: ${props => props.width.small || `100%`};
    background: white;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .tcp-drawer-content {
      width: ${props => props.width.medium || `100%`};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    &.tcp-drawer {
      display: block;
    }
    .tcp-drawer-content {
      width: ${props => props.width.large || `100%`};
      background: none;
    }
  }
`;
