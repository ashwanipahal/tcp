import { css } from 'styled-components';

export const customStyles = css`
  display: flex;
  flex: 1;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  img {
    height: 13px;
    width: 13px;
    padding: 4px 7px 0 10px;
  }
  span {
    font-weight: bold;
    font-size: 14px;
  }
  .removeErrorMessage {
    text-decoration: underline;
    cursor: pointer;
    padding-bottom: 6px;
  }
`;

export const miniBagCSS = css`
  position: relative;
`;

export default css`
  margin: 15px 0;
  background: #fff;
  padding: 20px;
`;
