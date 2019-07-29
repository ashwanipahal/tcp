import { css } from 'styled-components';

const selectStyles = css`
  position: relative;
  display: block;
  height: 70px;

  .select__input {
    appearance: none;
    background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
      no-repeat right 0px bottom 6px;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
    ${props =>
      props.meta.touched && props.meta.error
        ? `border-bottom: 1px solid ${props.theme.colors.TEXTBOX.ERROR_BORDER};`
        : ''};
    border-radius: 0;
    color: ${props => props.theme.colors.TEXTBOX.COLOR};
    font-size: ${props => props.theme.fonts.fontSize.textbox_input}px;
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    outline: 0;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0
      ${props => props.theme.spacing.ELEM_SPACING.XS};
    width: 100%;

    ${props =>
      props.disabled
        ? `
      background-color: ${props.theme.fieldBackgroundDisabledColor};
      border-color: ${props.theme.fieldBorderDisabledColor};
    `
        : ''};
  }

  .select__label {
    font-size: ${props => props.theme.fonts.fontSize.body.small.primary}px;
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
    padding: 0;
    position: absolute;
    top: 0;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default selectStyles;
