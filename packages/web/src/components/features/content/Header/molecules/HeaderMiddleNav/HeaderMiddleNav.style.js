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
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
    @media ${props => props.theme.mediaQuery.mediumMax} {
      width: 71%;
      margin-top: auto;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 74%;
    }
  }
  .account-info-section {
    cursor: pointer;
    display: inline-block;
    line-height: normal;
    padding: 0px 12px;
  }
  .carrot-down-icon {
    margin-left: 9px;
    transform: rotate(0deg);
    transition: transform 0.1s linear;
  }
  .carrot-up-icon {
    margin-left: 9px;
    transform: rotate(180deg);
    transition: transform 0.15s linear;
  }
  .account-info {
    cursor: pointer;
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline-flex;
    }
  }
  .user-name {
    &:hover {
      color: ${props => props.theme.colorPalette.blue[500]};
    }
  }
  .usericon {
    cursor: pointer;
    display: inline-block;
    vertical-align: baseline;
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .product-image {
    padding-left: 12px;
    vertical-align: baseline;
  }
  #login {
    padding-right: 12px;
  }
  #createaccount {
    padding-left: 12px;
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
