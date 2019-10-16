import { css } from 'styled-components';

export default css`
  &.show-condensed-header {
    box-sizing: border-box;
    padding: 14px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: ${props => props.theme.zindex.zCondensedHeader};
    background-color: ${props => props.theme.colorPalette.white};
    text-align: center;
    width: 100%;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[300]};

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 12px 15px;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 14px 15px;
    }
  }

  .content-wrapper {
    margin: 0 auto;
    width: 100%
  }

  .condensed-hamburger-menu,
  .condensed-brand-logo,
  .condensed-navigation {
    float: left;
  }

  .condensed-hamburger-menu {
    margin-right: 39px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 5px 0;
    }

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }
  .search-icon{
    padding:0 12px;
  }
  .product-image{
    padding-left:12px;
  }

  .condensed-brand-logo {
    height: 25px;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      height: 30px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    @media ${props => props.theme.mediaQuery.large} {
      height: 41px;
    }

    img {
      width: 72px;
      height: 25px;

      @media ${props => props.theme.mediaQuery.medium} {
        width: 83px;
        height: 30px;
      }

      @media ${props => props.theme.mediaQuery.large} {
        width: 115px;
          height: 41px;
      }
    }
  }

  .condensed-navigation {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;

    .nav-bar-l1-item {
      color: ${props => props.theme.colorPalette.gray[900]};
    }

    @media ${props => props.theme.mediaQuery.largeOnly} {
      .nav-bar-l1-content {
        padding: 0 15px 5px;
      }
    }

    @media ${props => props.theme.mediaQuery.large} {
      .nav-bar-l1 {
        padding-top: 10px;
      }

      .is-open .nav-bar-item-sizes-range {
        top: 52px;
      }

      .is-open .nav-bar-l2 {
        display: block;
        top: 100%;
        left: -21.5%;
        width: 145%;
      }
    }

    .nav-bar-l1-content {
      padding-top: 0;
      line-height: 2;
    }

    .l1-overlay.is-open {
      top: 70px;
    }

    .nav-bar-item-label {
      font-size: 13px;
    }
  }

  .condensed-header-icons {
    float: right;
    display: flex;
    flex-direction: row;
    flex: 1;

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 6px;
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

  .tcp-drawer__isOpen {
    display: none;
  }

  .search-icon,
  .user-icon-link {
    height: 25px;
  }

  .user-icon-link {
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.LRG}
  }

  .rightLink {
    box-sizing: border-box;
  }

  .username {
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    overflow: hidden;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
    line-height: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  .condensed-border {
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
