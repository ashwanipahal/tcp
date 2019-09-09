import { css } from 'styled-components';

const styles = css`
  background: white;
  .color-selector {
    label {
      padding: 0;
    }
    .color-image {
      border-radius: 30px;
    }
  }
  .size-selector {
    span {
      border: 1px solid black;
      margin: 0 10px;
    }
  }
`;

export const buttonCustomStyles = css`
  min-height: unset;
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  text-transform: none;
  &:hover {
    background-color: transparent;
  }
`;

export default styles;
