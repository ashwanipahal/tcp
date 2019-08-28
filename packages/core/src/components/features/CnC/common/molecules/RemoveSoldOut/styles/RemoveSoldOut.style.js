import { css } from 'styled-components';

export default css`
  display: flex;
  flex: 1;
  padding-bottom: 13px;
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  img {
    height: 13px;
    width: 13px;
    padding: 3px 13px 0 0;
  }
  .removeItem {
    margin: -11px 0 0 32px;
  }
  .removeAnchor {
    margin: 0 2px;
    background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  }
  .pointer {
    cursor: pointer;
    margin-bottom: 1px;
  }
`;
