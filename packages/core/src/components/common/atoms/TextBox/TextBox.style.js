import { css } from 'styled-components';

const textboxStyles = css`
  position: relative;
  display: block;

  .TextBox__label {
    font-size: ${props =>
      props.input && props.input.value
        ? props.theme.fonts.fontSize.body.small.primary
        : props.theme.fonts.fontSize.textbox}px;
    padding: 0;
    position: absolute;
    top: ${props => (props.input && props.input.value ? 0 : props.theme.spacing.ELEM_SPACING.MED)};
    ${props =>
      props.input &&
      props.input.value &&
      `
      font-weight: ${props.theme.fonts.fontWeight.bold};
    `}
  }

  .TextBox__input {
    margin: 0;
    outline: 0;
    font-size: ${props => props.theme.fonts.fontSize.textbox_input}px;
    color: ${props => props.theme.colors.TEXTBOX.COLOR};
    width: 100%;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: contain;
    border: 0 solid transparent;
    border-bottom: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};

    ${props =>
      props.meta &&
      props.meta.touched &&
      props.meta.error &&
      `
      border-bottom: 1px solid ${props.theme.colors.NOTIFICATION.ERROR};
    `}

    ${({ theme, meta: { active, pristine, invalid, asyncValidating }, showSuccessCheck }) =>
      showSuccessCheck || (!active && !pristine && !invalid && !asyncValidating)
        ? `border-bottom: 1px solid ${theme.colorPalette.success};`
        : ''}

    ${props =>
      props.disabled
        ? `
      background-color: ${props.theme.fieldBackgroundDisabledColor};
      border-color: ${props.theme.fieldBorderDisabledColor};
    `
        : ''};

    &:focus + .TextBox__label {
      font-size: ${props => props.theme.fonts.fontSize.body.small.primary}px;
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
      top: 0;
    }
  }

  .success__checkmark {
    width: 15px;
    height: 8px;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    transform: rotate(-45deg);
    transform-origin: left;
    position: absolute;
    right: 0;
    bottom: 10px;

    &:before {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      background-color: ${props => props.theme.colors.TEXTBOX.SUCCESS_BORDER};
    }

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: ${props => props.theme.colors.TEXTBOX.SUCCESS_BORDER};
      bottom: 0;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};

  .visible-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export default textboxStyles;
