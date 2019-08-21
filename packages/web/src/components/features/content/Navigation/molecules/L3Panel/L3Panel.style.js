import { css } from 'styled-components';

export default css`
  .l3-panel-header {
    position: relative;
    text-align: center;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
    margin: 0 14px;
  }
  .nav-bar-l3-details {
    margin: 0;
    ul {
      width: 100%;
    }
  }
`;
