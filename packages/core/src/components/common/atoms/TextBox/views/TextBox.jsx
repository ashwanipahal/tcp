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
  isErrorState?: boolean,
  isSuccessState?: boolean,
  onChangeHandler?: any,
  meta: { touched: any, error: any, warning: any },
  input: any,
  Value: any,
  maxLength: any,
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
  isSuccessState,
  maxLength,
  input,
  meta = {},
}: Props): Node => {
  const elemValue = input.value;
  return (
    <label
      htmlFor={name}
      className={`${className} ${elemValue ? 'active' : ''} input-fields-wrapper`}
    >
      <input
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="TextBox__input"
        name={name}
        type={type}
        isSuccessState={isSuccessState}
        maxLength={maxLength}
        Value={elemValue}
        placeholder=""
      />
      <BodyCopy bodySize="two" BodycolorLg="primary" tag="p" className="TextBox__label">
        {placeholder}
      </BodyCopy>
      {meta.touched && meta.error && (
        <BodyCopy ErrorMsg="error" bodySize="two" tag="div">
          {getErroMsg(errors[meta.error], placeholder)}
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
  isErrorState: false,
  isSuccessState: false,
  onChangeHandler: () => {},
};

export default withStyles(TextBox, StyledTextBox);
export { TextBox as TextBoxVanilla };
