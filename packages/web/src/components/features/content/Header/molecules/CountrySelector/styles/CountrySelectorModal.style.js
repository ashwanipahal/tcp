import { css } from 'styled-components';

export const modalStyles = css`
  .TCPModal__InnerContent {
    text-align: center;
  }
  .Modal_Heading {
    font-size: ${props => props.theme.typography.fontSizes.fs36};
    border: none;
    display: block;
    margin: 16px 0 12px;
    padding: 0;
  }
`;

const styles = css`
  background-color: #fff;
`;

export default styles;
