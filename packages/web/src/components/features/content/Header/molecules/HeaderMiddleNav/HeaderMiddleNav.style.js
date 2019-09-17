import { css } from 'styled-components';

/**
 * @function to return margin left for bag count icon
 * @param {string} cartItemCount - no of items in cart
 */
const cartItemMargin = cartItemCount => {
  let marginLeft = '-7px';
  if (cartItemCount && cartItemCount.length > 0) {
    switch (cartItemCount.length) {
      case 2:
        marginLeft = '-9px';
        break;
      case 3:
        marginLeft = '-14px';
        break;
      default:
        break;
    }
  }
  return marginLeft;
};

export default css`
  box-sizing: border-box;
  padding: 14px 0;
  position: relative;
  text-align: center;

  .hamburger-menu {
    cursor: pointer;
    width: 22px;
    height: 22px;
  }

  .header-middle-nav-search {
    @media ${props => props.theme.mediaQuery.small} and ${props =>
  props.theme.mediaQuery.mediumMax} {
    width:20%;
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
  .username {
    cursor: pointer;
    display: inline-block;
  }
  .product-image {
    vertical-align: baseline;
  }

  .rightLink {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[500]};
    box-sizing: border-box;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    min-width: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
  .search-image {
    padding-top: 5px;
  }
  .cartCount {
    background: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.primary.dark
        : props.theme.colorPalette.blue['800']};
    color: ${props => props.theme.colors.WHITE};
    border-radius: 8px;
    margin: 1px 0px 0px ${props => cartItemMargin(props.cartItemCount)};
    padding: 2px 6px;
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
`;
