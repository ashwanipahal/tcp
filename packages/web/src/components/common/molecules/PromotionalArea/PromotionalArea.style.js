import { css } from 'styled-components';

export default css`
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;

  .header-topnav__promo-area--mobile {
    background-color: ${props => props.theme.colors.PRIMARY.NAVY};
    color: ${props => props.theme.colors.WHITE};
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    padding: 8px 0;

    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }

  .header-topnav__promo-area--tablet {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    margin-top: 16px;

    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-family: ${props => props.theme.fonts.secondaryFontSemilBoldFamily};
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4}px;
    }
  }

  a {
    color: ${props => props.theme.colors.WHITE};
    text-decoration: none;

    @media ${props => props.theme.mediaQuery.medium} {
      color: ${props => props.theme.colors.BLACK};
    }
  }
`;
