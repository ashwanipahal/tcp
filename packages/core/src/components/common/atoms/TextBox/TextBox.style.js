import { css } from 'styled-components';

const textboxStyles = css`
  margin: 0;
  outline: 0;
  line-height: 44px;
  font-size: 1rem;
  border-radius: 25px;
  background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
  color: ${props => props.theme.colors.TEXTBOX.COLOR};
  border: 1px solid ${props => props.theme.colors.TEXTBOX.BACKGROUND};
  width: calc(100% - 40px);
  padding: 0 20px;

  ${props =>
    props.isErrorState ? `border: 1px solid ${props.theme.colors.TEXTBOX.ERROR_BORDER};` : ''};
  ${props =>
    props.isSuccessState ? `border: 1px solid ${props.theme.colors.TEXTBOX.SUCCESS_BORDER};` : ''};

  ${props =>
    props.textIcon === 'icon-email'
      ? `
    background-image: url(/static/images/email.svg);
    background-position: left top;
    background-repeat: no-repeat;
    background-size: contain;
    padding: 0 52px;
    width: calc(100% - 104px);`
      : ''};

  ${props =>
    props.textIcon === 'icon-sms'
      ? `
    background-image: url(/static/images/chat.svg);
    background-position: left top;
    background-repeat: no-repeat;
    background-size: contain;
    padding: 0 52px;
    width: calc(100% - 104px)`
      : ''};

  ${props =>
    props.disabled
      ? `
      background-color: ${props.theme.fieldBackgroundDisabledColor};
      border-color: ${props.theme.fieldBorderDisabledColor};
    `
      : ''};
  &:focus {
    border: 1px solid ${props => props.theme.colors.TEXTBOX.FOCUS_BORDER};
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default textboxStyles;
