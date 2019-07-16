import React from 'react';
import type { Node } from 'react';
import BodyCopy from '../../BodyCopy';
import withStyles from '../../../hoc/withStyles';
import StyledTextBox from '../TextBox.style';

// @flow

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
  type?: string,
  placeholder?: string,
  onChangeHandler?: any,
  meta?: { touched: any, error: any, warning: any },
  input: any,
  maxLength: any,
  inputRef: any,
  dataLocator?: string,
  showSuccessCheck?: boolean,
};

const TextBox = ({
  className,
  id,
  ariaLabel,
  type,
  placeholder,
  maxLength,
  input,
  inputRef,
  meta: { touched, error },
  dataLocator,
  showSuccessCheck,
}: Props): Node => {
  const elemValue = input.value;
  return (
    <label htmlFor={input.name} className={`${className} input-fields-wrapper`}>
      <input
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="TextBox__input"
        name={input.name}
        type={type}
        maxLength={maxLength}
        value={elemValue}
        ref={inputRef}
        placeholder=""
        data-locator={dataLocator}
      />
      <BodyCopy className="TextBox__label" fontFamily="secondary" fontSize="fs12">
        {placeholder}
      </BodyCopy>
      {touched && error && (
        <BodyCopy
          className="TextBox__error"
          color="error"
          component="div"
          fontSize="fs12"
          fontFamily="secondary"
        >
          {error}
        </BodyCopy>
      )}
      {showSuccessCheck && <div className="success__checkmark" />}
    </label>
  );
};

TextBox.defaultProps = {
  id: '',
  ariaLabel: '',
  type: 'text',
  placeholder: '',
  onChangeHandler: () => {},
  dataLocator: '',
  meta: {},
  showSuccessCheck: false,
};

export default withStyles(TextBox, StyledTextBox);
export { TextBox as TextBoxVanilla };
