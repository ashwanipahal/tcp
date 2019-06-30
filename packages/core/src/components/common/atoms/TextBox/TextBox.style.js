import { css } from 'styled-components';

const textboxStyles = css`
  &.active p {
    top: -50px;
  }
  input.TextBox__input[type='checkbox'] {
    width: auto;
    zoom: 2;
    position: relative;
    top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  }
  &.input-fields-wrapper {
    position: relative;
    div {
      position: absolute;
      top: 45px;
    }
  }
  &.input-fields-wrapper + span {
    padding-left: 5px;
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    &.checkbox-align {
      float: left;
      margin: 5px;
    }
    &.input-fields-wrapper {
      overflow: hidden;
    }

    &div:last-child {
      padding-right: auto;
    }
  }
  .TextBox__input {
    margin: 0;
    outline: 0;
    line-height: 44px;
    font-size: ${props => props.theme.fonts.fontSize.textbox}px;
    color: ${props => props.theme.colors.TEXTBOX.COLOR};
    width: calc(100% - 40px);
    padding: 0 10px;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: contain;
    border: 0 solid transparent;
    border-bottom: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 100%;
      overflow: hidden;
    }
    ${props =>
      props.meta.touched && props.meta.error
        ? `border-bottom: 1px solid ${props.theme.colors.TEXTBOX.ERROR_BORDER};`
        : ''};
    ${props =>
      props.isSuccessState
        ? `border: 1px solid ${props.theme.colors.TEXTBOX.SUCCESS_BORDER};`
        : ''};

    ${props =>
      props.textIcon === 'icon-email'
        ? `
    background-image: url(/static/images/email.svg);
    padding: 0 20px 0 52px;
    width: calc(100% - 72px);`
        : ''};

    ${props =>
      props.textIcon === 'icon-sms'
        ? `
    background-image: url(/static/images/chat.svg);
    padding: 0 20px 0 52px;
    width: calc(100% - 72px)`
        : ''};

    ${props =>
      props.disabled
        ? `
      background-color: ${props.theme.fieldBackgroundDisabledColor};
      border-color: ${props.theme.fieldBorderDisabledColor};
    `
        : ''};

    &:focus + p {
      top: -50px;
    }
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default textboxStyles;
