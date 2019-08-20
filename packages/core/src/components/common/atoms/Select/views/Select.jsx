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
}: Props): Node => {
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
      >
        {!input.value && placeholder && <option value="">{placeholder}</option>}
        {options &&
          options.map(option => {
            return (
              <option value={option.id} id={option.id} key={option.id}>
                {option.displayName}
              </option>
            );
          })}
      </select>
      <BodyCopy fontSize="fs12" fontFamily="secondary" className="select__label">
        {placeholder}
      </BodyCopy>
      {touched && error && (
        <BodyCopy fontSize="fs12" fontFamily="secondary" component="div" color="error">
          {error}
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
  dataLocator: '',
};

export default withStyles(SelectBox, StyledTextBox);
export { SelectBox as SelectBoxVanilla };
