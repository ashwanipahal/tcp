// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '../../../../../styles/themes/TCP/typotheme';
import withStyles from '../../hoc/withStyles';
import StyledTextBox from '../TextBox/TextBox.style';

type Props = {
  className: any,
  inputRef: any,
  placeholder: any,
  meta: { touched: any, error: any, warning: any },
};

const LabeledInput = ({
  className,
  inputRef,
  placeholder,
  meta: { touched, error, warning },
}: Props): Node => (
  <label htmlFor={placeholder} tabIndex="-1">
    <input placeholder="" className={className} ref={inputRef} />
    <BodyCopy
      ErrorMsg={touched && error ? 'error' : ''}
      bodySize="two"
      FormVariation="float"
      BodycolorLg="primary"
      tag="p"
    >
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
