// @flow
import React from 'react';
import type { Node } from 'react';
import BodyCopy from '../../BodyCopy';
import withStyles from '../../../hoc/withStyles';
import errors from '../../../../../utils/errorsMsg';
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
};

const getErroMsg = (value, placeholder) => {
  return value.replace('@@LABEL@@', placeholder);
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
}: Props): Node => {
  const isError = touched && error;
  return (
    <div
      className={`${className} ${input.value ? 'active' : ''} ${
        isError ? 'error' : ''
      } select-fields-wrapper`}
    >
      <select
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="selectField"
        name={name}
        value={input.value}
      >
        {options &&
          options.map(option => {
            return (
              <option value={option.id} id={option.id} key={option.id}>
                {option.displayName}
              </option>
            );
          })}
      </select>
      <BodyCopy fontSize="fs12" fontFamily="secondary" className="selectField__label">
        {placeholder}
      </BodyCopy>
      {touched && error && (
        <BodyCopy fontSize="fs12" fontFamily="secondary" component="div" color="error">
          {getErroMsg(errors[error], placeholder)}
        </BodyCopy>
      )}
    </div>
  );
};

SelectBox.defaultProps = {
  id: '',
  ariaLabel: '',
  name: '',
  type: 'text',
  placeholder: '',
};

export default withStyles(SelectBox, StyledTextBox);
export { SelectBox as SelectBoxVanilla };
