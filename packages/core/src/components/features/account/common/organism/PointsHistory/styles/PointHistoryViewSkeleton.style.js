import { css } from 'styled-components';

export default css`
  .col-border-color {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    height: 20px;
  }
`;
