import { css } from 'styled-components';

const styles = css`
  background-color: black;

  .view-order-link {
    color: ${props => props.theme.colorPalette.white};
  }
  .separator-line {
    border-bottom: solid 1px ${props => props.theme.colorPalette.white};
  }

  div:last-child {
    border: none;
  }
`;

export default styles;
