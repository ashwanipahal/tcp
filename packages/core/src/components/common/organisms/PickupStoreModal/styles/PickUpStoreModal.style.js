import { css } from 'styled-components';

const styles = css`
  .TCPModal__InnerContent {
    overflow: hidden;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding: 14px;
    }
  }
`;

export default styles;
