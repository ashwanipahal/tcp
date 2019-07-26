import { css } from 'styled-components';

const GlobalCss = css`
  margin: 0 0 37px 0;
  ::after {
    content: '';
    height: 1px;
    width: 80px;
    background: ${props => props.theme.colors.TEXT.DARKERBLUE};
    border: 10px;
    display: block;
    margin-top: 26px;
  }
  &.img-link {
    ::after {
      display: none;
    }
    img {
      padding-bottom: 35px;
    }
  }
  &.subHeader {
    margin-top: 24px;
  }
`;

export default GlobalCss;
