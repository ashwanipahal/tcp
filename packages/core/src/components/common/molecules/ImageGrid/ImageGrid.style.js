import { css } from 'styled-components';

export default css`
  .image-col {
    display: flex;
    max-width: ${props => props.imageMaxWidth};
  }
`;
