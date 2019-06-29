// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
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
  isErrorState?: boolean,
  isSuccessState?: boolean,
  onChangeHandler?: any,
  meta: { touched: any, error: any, warning: any },
  input: any,
  Value: any,
  options: any,
  defaultValue: any,
};
const SelectBox = ({
  className,
  id,
  ariaLabel,
  name,
  placeholder,
  isSuccessState,
  defaultValue,
  input,
  Value,
  options,
  meta: { touched, error, warning },
}: Props): Node => (
  <label htmlFor={name} className={`${className} ${input.value ? 'active' : ''}`}>
    <select
      {...input}
      id={id}
      aria-label={ariaLabel}
      className="selectField"
      name={name}
      isSuccessState={isSuccessState}
      value={Value}
      defaultValue={defaultValue}
    >
      {options &&
        options.map(option => {
          const selected = option.displayName === defaultValue ? `selected` : '';
          return (
            <option value={option.displayName} selected={selected} id={option.id} key={option.id}>
              {option.displayName}
            </option>
          );
        })}
    </select>
    {/* commented onChange={onChangeHandler} */}
    <BodyCopy bodySize="two" FormVariation="float" BodycolorLg="primary" tag="label">
      {placeholder}
    </BodyCopy>
    {touched &&
      ((error && (
        <BodyCopy clearFloat ErrorMsg="error" bodySize="two" tag="div">
          {error}
          {placeholder}
        </BodyCopy>
      )) ||
        (warning && (
          <BodyCopy bodySize="two" tag="div">
            {warning}
          </BodyCopy>
        )))}
  </label>
);

SelectBox.defaultProps = {
  id: '',
  ariaLabel: '',
  name: '',
  type: 'text',
  placeholder: '',
  isErrorState: false,
  isSuccessState: false,
  onChangeHandler: () => {},
};

export default withStyles(SelectBox, StyledTextBox);
export { SelectBox as SelectBoxVanilla };
