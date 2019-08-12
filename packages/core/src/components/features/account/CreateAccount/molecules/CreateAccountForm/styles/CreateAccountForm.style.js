import { css } from 'styled-components';

const Styles = css`
  .remember-me-text {
    display: block;
  }
  .tooltip-bubble {
    min-width: 300px;

    li {
      text-align: left;

      &:before {
        content: '-';
        text-indent: -5px;
      }
    }
  }
`;

export default Styles;
