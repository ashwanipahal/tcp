import { css } from 'styled-components';

const styles = css`
  .venmo-button {
    background-color: ${props => props.theme.colors.VENMO};
    width: 100%;
    height: 42px;
    margin: 10px 0;
    border-radius: 4px;
  }
`;

export default styles;
