// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import withStyles from '../../../hoc/withStyles';
import errors from '../../../../../utils/errorsMsg';
import StyledTextBox from '../TextBox.style';

/**
 * @param {object} props : Props for button
 * @desc This is a Textbox component. The textbox also supports the icons in the front of the textbox.
 * The textIcon = icon-sms and icon-email are currently supported with natural fill.
 * The border styles for success and error are governed by isErrorState and isSuccessState props.
 * The prop disabled determines if the textbox needs to be disabled or not.
 */
type Props = {
  id?: string,
  className: string,
  ariaLabel?: string,
  name?: string,
  type?: string,
  placeholder?: string,
  onChangeHandler?: any,
  meta: { touched: any, error: any, warning: any },
  input: any,
  maxLength: any,
  inputRef: any,
};
const getErroMsg = (value, placeholder) => {
  return value.replace('@@LABEL@@', placeholder);
};

const TextBox = ({
  className,
  id,
  ariaLabel,
  name,
  type,
  placeholder,
  maxLength,
  input,
  inputRef,
  meta: { touched, error },
}: Props): Node => {
  const elemValue = input.value;
  const isError = touched && error;
  return (
    <label
      htmlFor={name}
      className={`${className} ${elemValue ? 'active' : ''} ${
        isError ? 'error' : ''
      } input-fields-wrapper`}
    >
      <input
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="TextBox__input"
        name={name}
        type={type}
        maxLength={maxLength}
        value={elemValue}
        ref={inputRef}
        placeholder=""
      />
      <BodyCopy bodySize="two" BodycolorLg="primary" tag="p" className="TextBox__label">
        {placeholder}
      </BodyCopy>
      {touched && error && (
        <BodyCopy ErrorMsg="error" bodySize="two" tag="div">
          {getErroMsg(errors[error], placeholder)}
        </BodyCopy>
      )}
    </label>
  );
};

TextBox.defaultProps = {
  id: '',
  ariaLabel: '',
  name: '',
  type: 'text',
  placeholder: '',
  onChangeHandler: () => {},
};

export default withStyles(TextBox, StyledTextBox);
export { TextBox as TextBoxVanilla };
