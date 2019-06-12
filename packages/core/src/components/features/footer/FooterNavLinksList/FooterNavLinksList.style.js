import { css } from 'styled-components';

const FooterNavLinksListCss = css`
  a {
    display: block;
    height: 34px;
    font-family: Nunito;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.15;
    letter-spacing: normal;
    color: #1a1a1a;
    :hover {
      text-decoration: underline;
    }
    ${props => (props.insideAcccordion ? `padding: 18px 28px 0;` : `padding: 18px 0 0;`)}
  }
`;

export default FooterNavLinksListCss;
