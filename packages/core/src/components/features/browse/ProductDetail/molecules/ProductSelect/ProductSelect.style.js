import { css } from 'styled-components';

const selectBoxCss = css`
  margin-left: 2px;
  ${props => (props.width ? `width: ${props.width}px` : `width: auto`)};
  .select__input {
    padding: 7px 0 8px 7px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    margin-bottom: 0;
  }
`;

export default selectBoxCss;
