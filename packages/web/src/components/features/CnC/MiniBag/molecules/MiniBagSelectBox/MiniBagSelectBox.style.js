import { css } from 'styled-components';

const selectBoxCss = css`
  margin-left: 2px;
  ${props =>
    props.width
      ? `
            width: ${props.width}px;
          `
      : `width: inherit`};
  .select__input {
    padding-top: 20px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    margin-bottom: 0;
  }
`;

export default selectBoxCss;
