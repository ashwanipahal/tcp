import { css } from 'styled-components';

export default css`
  display: none;

  &.show-condensed-header {
    display: block;
    box-sizing: border-box;
    padding: 14px 14px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 4;
    background-color: #ffffff;
    text-align: center;
    width: 100%;
    @media ${props => props.theme.mediaQuery.large} {
      padding: 0 14px;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      padding: 14px 0;
    }

    .nav-bar-l1-content {
      padding-top: 0;
      line-height: 1.7;
    }

    .tcp-drawer__isOpen{
      top: 316px;
    }
  }

  .navigation {
    overflow: hidden;
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

  .username {
    cursor: pointer;
    display: inline-block;
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
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
      width: 115px;
      height: 41px;
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
    @media ${props => props.theme.mediaQuery.large} {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;
