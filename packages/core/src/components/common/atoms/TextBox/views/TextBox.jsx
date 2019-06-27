// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import withStyles from '../../../hoc/withStyles';
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
};

const TextBox = ({
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
  meta: { touched, error, warning },
}: Props): Node => {
  const elemValue = input.value;
  return (
    <label htmlFor={name} tabIndex="-1" className={className}>
      <input
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="inputField"
        name={name}
        type={type}
        isSuccessState={isSuccessState}
        value={Value}
      />
      {/* commented onChange={onChangeHandler} */}
      <BodyCopy bodySize="two" FormVariation="float" BodycolorLg="primary" tag="p" className="">
        {placeholder}
      </BodyCopy>
      {touched &&
        ((error && (
          <BodyCopy ErrorMsg="error" bodySize="two" tag="span">
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
