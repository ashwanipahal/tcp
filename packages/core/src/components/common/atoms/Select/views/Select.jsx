// @flow
import React from 'react';
import type { Node } from 'react';
import BodyCopy from '../../BodyCopy';
import withStyles from '../../../hoc/withStyles';
import StyledTextBox from '../Select.style';

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
  meta: { touched: any, error: any, warning: any },
  input: any,
  options: any,
  defaultValue: any,
  dataLocator?: string,
  disabled?: boolean,
  title?: string,
};

const SelectBox = ({
  className,
  id,
  ariaLabel,
  name,
  placeholder,
  input,
  options,
  meta: { touched, error },
  dataLocator,
  disabled,
  title,
  ...otherProps
}: Props): Node => {
  const errorMessagea11yLbl = `selectbox__error__${name}`;

  return (
    <div className={className}>
      <select
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="select__input"
        name={name}
        value={input.value || placeholder}
        data-locator={dataLocator}
        {...otherProps}
        disabled={disabled}
        aria-describedby={errorMessagea11yLbl}
      >
        {!input.value && placeholder && <option value="">{placeholder}</option>}
        {options &&
          options.map(option => {
            return (
              <option
                value={option.id || option.get('id')}
                id={option.id || option.get('id')}
                key={option.id || option.get('id')}
              >
                {option.displayName || option.get('displayName')}
              </option>
            );
          })}
      </select>
      {/* the placeholder should not be used as title since different text
      is being used for placeholder and title in multiple instances */}
      {title ? (
        <BodyCopy fontSize="fs12" fontFamily="secondary" className="select__label">
          {title}
        </BodyCopy>
      ) : (
        ''
      )}
      <div className="SelectBox__error">
        <div className={touched && error ? 'warning-icon' : ''} aria-disabled="true" />
        {touched && error && (
          <BodyCopy
            fontSize="fs12"
            fontFamily="secondary"
            component="div"
            color="error"
            fontWeight="extrabold"
            role="alert"
            aria-live="assertive"
            id={errorMessagea11yLbl}
          >
            {error}
          </BodyCopy>
        )}
      </div>
    </div>
  );
};

SelectBox.defaultProps = {
  id: '',
  ariaLabel: '',
  name: '',
  type: 'text',
  placeholder: '',
  dataLocator: '',
  disabled: false,
  title: '',
};

export default withStyles(SelectBox, StyledTextBox);
export { SelectBox as SelectBoxVanilla };
