import { css } from 'styled-components';

export default css`
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
`;
