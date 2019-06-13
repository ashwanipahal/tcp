import { css } from 'styled-components';

const FooterNavLinksListCss = css`
  a {
    display: block;
    height: 34px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.body.large.secondary}px;
    line-height: ${props => props.theme.fonts.lineHeight.medium};
    letter-spacing: ${props => props.theme.fonts.letterSpacing.normal};
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    :hover {
      text-decoration: underline;
    }
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
`;

export default FooterNavLinksListCss;
