import { css } from 'styled-components';

export default css`
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

  .header-middle-nav-search {
    @media ${props => props.theme.mediaQuery.mediumMax} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 24%;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 20%;
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
    margin-top: 30px;
    @media ${props => props.theme.mediaQuery.mediumMax} {
      width: 71%;
      margin-top: auto;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 74%;
    }
  }
  .username {
    cursor: pointer;
    display: inline-block;
  }
  .carrot-down-icon {
    margin: 9px;
    transform: rotate(0deg);
    transition: transform 0.1s linear;
  }
  .carrot-up-icon {
    margin: 9px;
    transform: rotate(180deg);
    transition: transform 0.15s linear;
  }
  .user-name {
    cursor: pointer;
    display: none;
    @media ${props => props.theme.mediaQuery.large} {
      display: inline-block;
    }
  }
  .usericon {
    cursor: pointer;
    display: inline-block;
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }
  .product-image {
    vertical-align: baseline;
  }

  .rightLink {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[500]};
    box-sizing: border-box;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    min-width: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
  .cartCount {
    background: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.primary.dark
        : props.theme.colorPalette.blue['800']};
    color: ${props => props.theme.colors.WHITE};
    border-radius: 8px;
    margin: 1px 0px 0px -7px;
    padding: 2px 5px;
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
`;
