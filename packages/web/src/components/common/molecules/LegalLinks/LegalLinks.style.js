import { css } from 'styled-components';

export default css`
  font-size: 12px;
  color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  list-style-type: none;
  padding: 24px 0;
  margin: 0;
  display: flex;

  li {
    padding: 0 20px;
    border-left: 1px solid ${props => props.theme.colors.BORDER.LIGHTGRAY};
  }

  li:first-child {
    border-left: none;
  }

  a {
    color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  }
  a:hover {
    color: ${props => props.theme.colors.PRIMARY.BLUE};
    cursor: pointer;
  }
`;
