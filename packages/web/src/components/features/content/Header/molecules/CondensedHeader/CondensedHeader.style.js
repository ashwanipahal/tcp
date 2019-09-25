import { css } from 'styled-components';

export default css`
  &.show-condensed-header {
    display: block;
    box-sizing: border-box;
    padding: 14px 0;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: ${props => props.theme.zindex.zEnlargedImage};
    background-color: ${props => props.theme.colorPalette.white};
    text-align: center;
    width: 100%;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[300]};
    @media ${props => props.theme.mediaQuery.large} {
      padding: 0 14px;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      padding: 14px 0;
    }

    .nav-bar-l1 {
      overflow-x: hidden;

      @media ${props => props.theme.mediaQuery.large} {
        padding-top: 26px;
      }
    }

    .navigation {
      position: unset;
    }

    .nav-bar-l1-content {
      padding-top: 0;
      line-height: 2;
    }

    .tcp-drawer__isOpen{
      display: none;
    }
  }

  .hamburger-menu {
    display: block;
    cursor: pointer;
    width: 22px;
    height: 22px;
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }

  .rightLink {
    box-sizing: border-box;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .userIcon {
    height: 25px;
  }

  .username {
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    overflow: hidden;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    text-overflow: ellipsis;
    width: 70px;
    white-space: nowrap;
  }

  .brand-logo-middle {
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }

  .brand-logo-middle img {
    display: block;
    width: 72px;
    height: 25px;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 83px;
      height: 30px;
    }
  }

  .brand-logo-left {
    display: none;
    text-align: left;
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
      padding-top: 16px;
      img {
        width: 115px;
        height: 41px;
      }
    }
  }

  .header-middle-login-section {
    margin-top: 30px;
    @media ${props => props.theme.mediaQuery.small} and ${props =>
  props.theme.mediaQuery.mediumMax} {
    width: 74%;
    margin-top: auto;
    }
  }

  .flexbox {
    display: flex;
  }

  .cartCount {
    background: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.primary.dark
        : props.theme.colorPalette.blue['800']};
    color: ${props => props.theme.colors.WHITE};
    border-radius: 8px;
    margin: 1px 0px 0px -8px;
    padding: 2px 6px;
  }

  .condensed-icons{
    text-align: right;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      padding-left: 30px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-top: 23px;
    }
  }
  .l1-overlay.is-open {
    top: 70px;
  }

  .is-open {
    .nav-bar-l2 {
      @media ${props => props.theme.mediaQuery.large} {
        display: block;
        left: -40%;
        width: 180%;
        top: 100%;
      }
    }
  }
  .nav-bar-item-label {
    font-size: 13px;
  }

  .condensed-border{
    @media ${props => props.theme.mediaQuery.large} {
      position: fixed;
      top: 70px;
      left: -50%;
      width: 200%;
      z-index: ${props => props.theme.zindex.zEnlargedImage};
      height: 1px;
      background-color: ${props => props.theme.colorPalette.gray[300]};
    }

  }
`;
