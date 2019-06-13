import { css } from 'styled-components';

const GlobalCss = css`
  font-family: Nunito-SemiBold;
  font-size: 16px;
  color: ${props => props.theme.colors.ACCORDION.TEXT};
  margin: 0 0 50px 0;
  ::after {
    content: '';
    height: 1px;
    width: 80px;
    background: #439ad4;
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
`;

export default GlobalCss;
