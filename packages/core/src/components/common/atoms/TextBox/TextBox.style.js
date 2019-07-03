import { css } from 'styled-components';

const textboxStyles = css`
  &.active p {
    top: -50px;
  }
  &.input-fields-wrapper .Error__clearFloat {
    clear: both;
    top: -10px;
    position: relative;
  }

  input.TextBox__input[type='checkbox'] {
    position: relative;
    top: 0;
    appearance: none;
    outline: 0;
    border: 0;
    display: inline-block;
    height: 23px;
    width: 23px;
    @media ${props => props.theme.mediaQuery.large} {
      top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }

  input.TextBox__input[type='checkbox']:before {
    content: '';
    font-size: 20px;
    position: absolute;
    height: 20px;
    width: 20px;
    left: 0;
    box-shadow: inset 0 0 0 0.6px #575757;
  }
  &.active input.TextBox__input[type='checkbox']:after {
    transform: rotate(225deg);
    content: '';
    border: 2px inset #333;
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy2}px;
    width: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    height: 10px;
    float: left;
    border-right: 0;
    border-bottom: 0;
    left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    position: absolute;
  }
  &.input-fields-wrapper + span {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    &.checkbox-align {
      float: left;
      margin: ${props => props.theme.spacing.ELEM_SPACING.XXS};
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
