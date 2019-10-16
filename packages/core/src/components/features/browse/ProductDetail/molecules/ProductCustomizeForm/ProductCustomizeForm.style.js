import { css } from 'styled-components';

const styles = css`
  background: white;
  .color-selector {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    label {
      padding: 0;
    }
    .color-image {
      border-radius: 30px;
    }
  }
  .size-selector {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    span {
      border: 1px solid black;
      margin: 0 10px;
    }
  }
`;

export default styles;
