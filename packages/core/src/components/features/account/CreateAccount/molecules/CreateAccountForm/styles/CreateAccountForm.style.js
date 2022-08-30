import { css } from 'styled-components';

const Styles = css`
  .remember-me-text {
    display: block;
  }
  .already-account {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    color: ${props => props.theme.colorPalette.gray[900]};
  }
  .i-agree-checkbox {
    padding-top: 10px;
  }
  .checkbox-hide-show {
    background: ${props => props.theme.colors.WHITE};
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
