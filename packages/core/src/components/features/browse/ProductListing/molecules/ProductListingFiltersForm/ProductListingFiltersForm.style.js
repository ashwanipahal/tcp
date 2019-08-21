import { css } from 'styled-components';

export default css`
  width: 100%;
  padding: 20px 0px;
  margin-bottom: 0px;

  .custom-select-common {
    display: inline-block;
    margin: 0 12px;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray['600']};
    padding-bottom: 10px;
  }
`;
