import { css } from 'styled-components';

const selectBoxCss = css`
  margin-left: 2px;
  ${props => (props.width ? `width: ${props.width}px` : `width: auto`)};
  .select__input {
    padding: 11px 0 0 7px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    margin-bottom: 0;
  }
`;

export default selectBoxCss;
