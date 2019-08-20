import { css } from 'styled-components';

export const customStyles = css`
  display: flex;
  flex: 1;
  padding-top: 6px;
  padding-bottom: 13px;
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  img {
    height: 13px;
    width: 13px;
    padding: 3px 13px 0 0;
  }
  span {
    font-weight: bold;
    font-size: 16px;
  }
`;
export default css`
  margin: 15px 0;
  background: #fff;
  padding: 20px;
  .removeItem {
    margin: -11px 27px;
  }
`;
