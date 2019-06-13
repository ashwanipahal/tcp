import { css } from 'styled-components';

const FooterNavLinksListCss = css`
  a {
    display: block;
    height: 34px;
    font-family: Nunito;
    font-size: 13px;
    line-height: 1.15;
    letter-spacing: ${props => props.theme.fonts.letterSpacing.normal};
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    :hover {
      text-decoration: underline;
    }
    ${props =>
      props.insideAcccordion
        ? `
        padding: 18px 28px 0;
        font-size: 13px;
      `
        : `
        padding: 0 0 6px;
        font-size: 14px;
      `}
  }
`;

export default FooterNavLinksListCss;
