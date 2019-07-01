import { css } from 'styled-components';

const textboxStyles = css`
  &.active div {
    top: -65px;
  }
  &.select-fields-wrapper .Error__clearFloat {
    clear: both;
    top: -10px;
    position: relative;
  }
  &.select-fields-wrapper p {
    top: -30px;
    opacity: 0.8;
    position: relative;
    margin: 0;
    float: left;
    padding: 5px 0px 5px 10px;
  }
  .selectField {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0 0 0;
    height: 35px;
    outline: 0;
    line-height: 44px;
    font-size: ${props => props.theme.fonts.fontSize.textbox}px;
    color: ${props => props.theme.colors.TEXTBOX.COLOR};
    width: 100%;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.MEDLRG};
    background-position: left top;
    background-repeat: no-repeat;
    background-size: contain;
    background: none;
    border: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};

    ${props =>
      props.meta.touched && props.meta.error
        ? `border-bottom: 1px solid ${props.theme.colors.TEXTBOX.ERROR_BORDER};`
        : ''};
    ${props =>
      props.isSuccessState
        ? `border: 1px solid ${props.theme.colors.TEXTBOX.SUCCESS_BORDER};`
        : ''};

    ${props =>
      props.disabled
        ? `
      background-color: ${props.theme.fieldBackgroundDisabledColor};
      border-color: ${props.theme.fieldBorderDisabledColor};
    `
        : ''};
    &:focus + p {
      top: -65px;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default textboxStyles;
