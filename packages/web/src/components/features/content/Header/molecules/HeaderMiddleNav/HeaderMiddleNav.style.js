import { css } from 'styled-components';

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

  .rightLink {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[500]};
    box-sizing: border-box;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  @media ${props => props.theme.mediaQuery.mediumMax} {
    padding: 16px 0;
    text-align: left;
    .header-brand__home-logo--brand {
      display: none;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    padding-top: 31px;
    .hamburger-menu {
      display: none;
    }
  }
`;
