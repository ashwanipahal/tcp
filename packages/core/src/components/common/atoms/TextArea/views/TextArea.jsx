import React from 'react';
import type { Node } from 'react';
import BodyCopy from '../../BodyCopy';
import withStyles from '../../../hoc/withStyles';
import StyledTextArea from '../TextArea.style';

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
  placeholder?: string,
  errorDataLocator?: string,
  meta?: { touched: any, error: any, warning: any },
  maxLength: any,
  inputRef: any,
  dataLocator?: string,
  isRequired?: boolean,
  input: any,
};

const TextArea = ({
  className,
  id,
  ariaLabel,
  placeholder,
  maxLength,
  inputRef,
  meta,
  dataLocator,
  showSuccessCheck,
  enableSuccessCheck,
  isRequired,
  errorDataLocator,
  input,
  ...others
}: Props): Node => {
  const elemValue = input.value;
  const { touched, error } = meta;
  const errorMessagea11yLbl = `textarea__error__${input.name}`;

  return (
    <label htmlFor={id} className={`${className} input-fields-wrapper`}>
      <textarea
        {...others}
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="TextArea__input"
        name={input.name}
        maxLength={maxLength}
        value={elemValue}
        ref={inputRef}
        placeholder=""
        data-locator={dataLocator}
        aria-required={isRequired}
        aria-describedby={errorMessagea11yLbl}
      />
      <BodyCopy className="TextArea__label" fontFamily="secondary" fontSize="fs12">
        {placeholder}
      </BodyCopy>
      <div className="TextArea__error">
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

TextArea.defaultProps = {
  id: '',
  ariaLabel: '',
  placeholder: '',
  errorDataLocator: '',
  dataLocator: '',
  meta: {},
  isRequired: false,
};

export default withStyles(TextArea, StyledTextArea);
export { TextArea as TextAreaVanilla };
