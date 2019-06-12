import { css } from 'styled-components';

const GlobalCss = css`
  font-family: Nunito-SemiBold;
  font-size: 16px;
  color: #1a1a1a;
  margin: 0;
  ::after {
    content: '';
    height: 1px;
    width: 80px;
    background: #439ad4;
    border: 10px;
    display: block;
    margin-top: 26px;
  }
`;

export default GlobalCss;
