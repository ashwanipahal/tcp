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
  .is-hidden {
    display: none;
  }

  .tcp-drawer__isOpen {
    display: block;
    position: absolute;
    z-index: ${props => props.theme.zindex.zDrawer};
    top: ${props => (props.position && props.position.top) || 0};
    left: ${props => (props.position && props.position.left) || 0};
    width: 100%;
    height: ${props => props.height || `auto`};
  }
  .tcp-condensed-drawer {
    position: fixed;
    top: 58px;
  }
  .tcp-drawer-content {
    width: ${props => props.width.small || `100%`};
    background: ${props => props.theme.colorPalette.white};
    height: ${props => props.height || `auto`};
  }
  .display-small-none {
    display: none;
  }
  .account-main-section {
    cursor: pointer;
    width: 314px;
    display: flex;
    align-items: center;
    position: fixed;
    padding: 9px 14px;
    background-color: ${props => (props.theme.isGymboree ? '#fef4e8' : '#f1f9ff')};
    box-sizing: border-box;
    min-height: 50px;
    left: 0px;
  }
  .account-info {
    font-family: ${props => props.theme.typography.fonts.secondary};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }
  .user-name {
    font-size: ${props => props.theme.typography.fontSizes.fs13};
    text-align: left;
  }
  .user-points,
  .user-rewards {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
  .manage-account {
    position: absolute;
    top: 35%;
    right: 6%;
  }
  .rightLink {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[500]};
    box-sizing: border-box;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    min-width: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .tcp-drawer__isOpen {
      top: ${props => (props.position && props.position.topMedium) || 0};
    }
    .tcp-condensed-drawer {
      position: fixed;
      top: 62px;
    }
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
