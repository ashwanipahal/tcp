import { css } from 'styled-components';

export default css`
  .col-border-color {
    border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  }
`;
