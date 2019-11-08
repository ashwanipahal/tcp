import { css } from 'styled-components';

const styles = css`
  background-color: black;

  .view-order-link {
    color: white;
  }
  .separator-line {
    border-bottom: solid 1px ${props => props.theme.colors.WHITE};
  }
`;

export default styles;
