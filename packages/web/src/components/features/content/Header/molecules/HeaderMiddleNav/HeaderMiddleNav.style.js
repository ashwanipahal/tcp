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
`;
