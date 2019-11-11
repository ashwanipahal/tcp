import { css } from 'styled-components';

const style = css`
  box-sizing: border-box;
  padding: 14px 0;
  position: relative;
  text-align: center;

  .flexbox {
    display: flex;
  }

  .hamburger-menu {
    cursor: pointer;
    width: 22px;
    height: 22px;
  }
  .header-middle-nav {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin: 14px 0;
    }
  }
  .header-middle-nav-search {
    @media ${props => props.theme.mediaQuery.mediumMax} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 24%;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 12%;
    }

    .storelocatorlink__container,
    .storelocatorlink__container--fav {
      display: none;

      @media ${props => props.theme.mediaQuery.mediumOnly} {
        display: flex;
      }
    }
  }
  .header-middle-login-section {
    justify-content: flex-end;
    align-items: center;
    display: inline-flex;
    @media ${props => props.theme.mediaQuery.mediumMax} {
      width: 75%;
      margin-top: auto;
      display: inline-flex;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 88%;
      display: inline-flex;
    }
  }

  .header-middle-login-section .headerSearchBox {
    position: relative;
    flex-grow: unset;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      height: 100%;
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: 40px;
    }
  }
  .search-input-wrapper {
    margin-right: 30px;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-right: 54px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 37px;
    }
  }

  .account-info-section {
    display: inline-block;
    line-height: normal;
    margin-right: 25px;
  }
  .carrot-down-icon {
    cursor: pointer;
    margin-left: 9px;
    transform: rotate(0deg);
    transition: transform 0.1s linear;
  }
  .carrot-up-icon {
    cursor: pointer;
    margin-left: 9px;
    transform: rotate(180deg);
    transition: transform 0.15s linear;
  }
  .account-info {
    font-family: ${props => props.theme.typography.fonts.secondary};
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline-flex;
      align-items: center;
    }
  }
  .user-name {
    cursor: pointer;
    font-size: ${props => props.theme.typography.fontSizes.fs13};
    text-align: left;
    &:hover {
      color: ${props => props.theme.colorPalette.blue[500]};
    }
  }
  .user-points,
  .user-rewards {
    cursor: pointer;
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    color: ${props =>
      props.isUserPlcc ? props.theme.colorPalette.blue[500] : props.theme.colorPalette.orange[800]};
  }
  .usericon {
    cursor: pointer;
    display: inline-flex;
    vertical-align: baseline;
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .product-image {
    height: 25px;
    width: 20px;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 23px;
    }
    vertical-align: middle;
  }
  #login {
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  #createaccount {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .rightLink {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[500]};
    box-sizing: border-box;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    min-width: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    border-radius: 0px;
  }
  .header-middle-login-section a {
    position: relative;
  }
  .cartCount {
    background: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.primary.dark
        : props.theme.colorPalette.blue['800']};
    color: ${props => props.theme.colors.WHITE};
    border-radius: 8px;
    padding: 2px 5px;
    vertical-align: bottom;
    position: absolute;
    bottom: -5px;
    right: -10px;
  }
  @media ${props => props.theme.mediaQuery.mediumMax} {
    padding: 16px 0;
    text-align: left;
    .header-brand__home-logo--brand {
      display: none;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    padding: 31px 0 0;
    .hamburger-menu {
      display: none;
    }
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .storelocatorlink__container,
    .storelocatorlink__container--fav {
      display: none;
    }
  }

  .header-middle-nav-storelocator {
    display: flex;
    align-items: center;

    @media ${props => props.theme.mediaQuery.mediumMax} {
      display: none;
    }
  }

  .create-account-header-label,
  .login-header-label {
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline-flex;
    }
  }
`;

export const customHeaderStyle = css`
  .Modal_Heading {
    border-bottom: none;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    display: flex;
    justify-content: center;
    height: auto;
    padding-bottom: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;
      justify-content: center;
      height: auto;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .close-modal {
    display: none;
  }
`;

export default style;
