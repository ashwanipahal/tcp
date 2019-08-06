import { css } from 'styled-components';

const Styles = css`
  background-color: ${props => props.theme.colorPalette.gray[300]};
  .bottomLine {
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
  }
`;

export default Styles;
