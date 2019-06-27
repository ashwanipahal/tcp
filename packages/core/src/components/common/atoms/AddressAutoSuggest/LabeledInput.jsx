// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '../../../../../styles/themes/TCP/typotheme';
import withStyles from '../../hoc/withStyles';
import StyledTextBox from '../TextBox/TextBox.style';

type Props = {
  className: any,
  inputRef: any,
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
};

const LabeledInput = ({
  className,
  id,
  ariaLabel,
  name,
  type,
  placeholder,
  isErrorState,
  isSuccessState,
  input,
  Value,
  inputRef,
  meta: { touched, error, warning },
}: Props): Node => (
  <label htmlFor={placeholder} className={className} tabIndex="-1">
    <input
      placeholder=""
      {...input}
      id={id}
      aria-label={ariaLabel}
      className="inputField"
      name={name}
      type={type}
      isSuccessState={isSuccessState}
      value={Value}
      ref={inputRef}
    />
    <BodyCopy bodySize="two" FormVariation="float" BodycolorLg="primary" tag="p">
      {placeholder}
    </BodyCopy>
    {touched &&
      ((error && (
        <BodyCopy ErrorMsg="error" bodySize="two" tag="span">
          {error}
          {placeholder}
        </BodyCopy>
      )) ||
        (warning && (
          <BodyCopy bodySize="two" tag="span">
            {warning}
          </BodyCopy>
        )))}
  </label>
);

export default withStyles(LabeledInput, StyledTextBox);
export { LabeledInput as LabeledInputVanilla };
