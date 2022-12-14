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
  errorDataLocator?: string,
  onChangeHandler?: any,
  meta?: { touched: any, error: any, warning: any },
  input: any,
  maxLength: any,
  inputRef: any,
  dataLocator?: string,
  showSuccessCheck?: boolean,
  enableSuccessCheck?: boolean,
  isRequired?: boolean,
};

/**
 *
 * @param {Boolean} showSuccessCheck Forcefully show the success mark and success border. Override redux form params.
 * @param {Object} meta redux-form meta object to analyse the success state. Based on this class will be returned.
 * @return {string} Returns a class name if the form success validation criteria matches else blank string.
 */
const getValidationSuccessClass = (enableSuccessCheck, showSuccessCheck, meta) => {
  const { invalid, pristine, asyncValidating, active } = meta;
  return enableSuccessCheck &&
    (showSuccessCheck || (!active && !pristine && !invalid && !asyncValidating))
    ? 'textbox_validation_success'
    : '';
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
  meta,
  dataLocator,
  showSuccessCheck,
  enableSuccessCheck,
  isRequired,
  errorDataLocator,
  ...others
}: Props): Node => {
  const elemValue = input.value;
  const { touched, error } = meta;
  const errorMessagea11yLbl = `textbox__error__${input.name}`;

  return (
    <label
      htmlFor={id}
      className={`${className} input-fields-wrapper ${getValidationSuccessClass(
        enableSuccessCheck,
        showSuccessCheck,
        meta
      )}`}
    >
      <input
        {...others}
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
        aria-required={isRequired}
        aria-describedby={errorMessagea11yLbl}
      />
      <BodyCopy className="TextBox__label" fontFamily="secondary" fontSize="fs12">
        {placeholder}
      </BodyCopy>
      <div className="TextBox__error">
        <div className={touched && error ? 'warning-icon' : ''} aria-disabled="true" />
        <BodyCopy
          color="error"
          component="div"
          fontSize="fs12"
          fontFamily="secondary"
          fontWeight="extrabold"
          role="alert"
          aria-live="assertive"
          data-locator={errorDataLocator}
          id={errorMessagea11yLbl}
        >
          {touched && error ? error : ''}
        </BodyCopy>
      </div>
      {enableSuccessCheck && <div className="success__checkmark" />}
    </label>
  );
};

TextBox.defaultProps = {
  id: '',
  ariaLabel: '',
  type: 'text',
  placeholder: '',
  errorDataLocator: '',
  onChangeHandler: () => {},
  dataLocator: '',
  meta: {},
  showSuccessCheck: false,
  enableSuccessCheck: true,
  isRequired: false,
};

export default withStyles(TextBox, StyledTextBox);
export { TextBox as TextBoxVanilla };
