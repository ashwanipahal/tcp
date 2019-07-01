// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '../../../../../styles/themes/TCP/typotheme';
import withStyles from '../../hoc/withStyles';
import StyledTextBox from '../TextBox/TextBox.style';

/* @desc This is a Label input component. This input is specifically for the google auto suggest
, i am keeping this seprate from other input atom because , any changes happen in input might impact auto suggest */
type Props = {
  className: string,
  inputRef: any,
  id?: string,
  ariaLabel?: string,
  name?: string,
  type?: string,
  placeholder?: string,
  isSuccessState?: boolean,
  meta: { touched: any, error: any, warning: any },
  input: any,
  Value: string,
};

const LabeledInput = ({
  className,
  id,
  ariaLabel,
  name,
  type,
  placeholder,
  isSuccessState,
  input,
  inputRef,
  meta: { touched, error, warning },
}: Props): Node => {
  const elemValue = input.value;
  return (
    <label
      htmlFor={name}
      className={`${className} ${elemValue ? 'active' : ''} input-fields-wrapper`}
    >
      <input
        placeholder=""
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="TextBox__input"
        name={name}
        type={type}
        isSuccessState={isSuccessState}
        value={elemValue}
        ref={inputRef}
      />
      <BodyCopy bodySize="two" FormVariation="float" BodycolorLg="primary" tag="p">
        {placeholder}
      </BodyCopy>
      {touched &&
        ((error && (
          <BodyCopy clearFloat ErrorMsg="error" bodySize="two" tag="div">
            {error}
            {!elemValue && placeholder}
          </BodyCopy>
        )) ||
          (warning && (
            <BodyCopy bodySize="two" tag="span">
              {warning}
            </BodyCopy>
          )))}
    </label>
  );
};
LabeledInput.defaultProps = {
  id: '',
  ariaLabel: '',
  name: '',
  type: '',
  placeholder: '',
  isSuccessState: false,
};
export default withStyles(LabeledInput, StyledTextBox);
export { LabeledInput as LabeledInputVanilla };
