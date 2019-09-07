import { css } from 'styled-components';

const Styles = css`
  .remember-me-text {
    display: block;
  }
  .i-agree-checkbox {
    padding-top: 10px;
  }
  .tooltip-bubble {
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
