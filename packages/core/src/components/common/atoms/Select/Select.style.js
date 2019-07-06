import { css } from 'styled-components';

const textboxStyles = css`
  &.select-fields-wrapper {
    position: relative;
    display: block;
    height: 70px;
  }
  .selectField {
    margin: 0;
    outline: 0;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
    border-radius: 0;
    font-size: ${props => props.theme.fonts.fontSize.textbox_input}px;
    color: ${props => props.theme.colors.TEXTBOX.COLOR};
    width: 100%;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0
      ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
      no-repeat right 0px bottom 6px;
    -webkit-appearance: none;

    ${props =>
      props.meta.touched && props.meta.error
        ? `border-bottom: 1px solid ${props.theme.colors.TEXTBOX.ERROR_BORDER};`
        : ''};
    ${props =>
      props.isSuccessState
        ? `border-bottom: 1px solid ${props.theme.colors.TEXTBOX.SUCCESS_BORDER};`
        : ''};

    ${props =>
      props.disabled
        ? `
      background-color: ${props.theme.fieldBackgroundDisabledColor};
      border-color: ${props.theme.fieldBorderDisabledColor};
    `
        : ''};
  }

  .selectField__label {
    font-size: ${props => props.theme.fonts.fontSize.body.small.primary}px;
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
    padding: 0;
    position: absolute;
    top: 0;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default textboxStyles;
