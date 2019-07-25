import { css } from 'styled-components';

const FooterNavLinksListCss = css`
  list-style-type: none;
  padding-inline-start: 0;
  margin: 0;
  li {
    height: 34px;
    ${props =>
      props.insideAcccordion
        ? `
        padding: 18px 28px 0;
        font-size: ${props.theme.fonts.fontSize.body.large.secondary}px;
      `
        : `
        padding: 0 0 6px;
        font-size: ${props.theme.fonts.fontSize.listmenu.large}px;
      `}
  }
  a {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    line-height: ${props => props.theme.fonts.lineHeight.medium};
    letter-spacing: ${props => props.theme.fonts.letterSpacing.normal};
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    :hover {
      border-bottom: 2px solid ${props => props.theme.colors.ANCHOR.SECONDARY};
      padding-bottom: 4px;
      text-decoration: none;
    }
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.fonts.fontSize.promo2.large}px;
    }
  }
`;

export default FooterNavLinksListCss;
