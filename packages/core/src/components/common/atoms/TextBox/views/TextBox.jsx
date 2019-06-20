// @flow
import React from 'react';
import type { Node } from 'react';
import { BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';
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
  onChangeHandler?: func,
  floatingLabel?: string,
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
  onChangeHandler,
  floatingLabel,
}: Props): Node => (
  <label tabIndex="-1">
    <input
      floatingLabel={floatingLabel}
      id={id}
      aria-label={ariaLabel}
      className={className}
      name={name}
      type={type}
      isErrorState={isErrorState}
      isSuccessState={isSuccessState}
      onChange={onChangeHandler}
    />
    <BodyCopy bodySize="two" FormVariation="float" BodycolorLg="primary" tag="p">
      {placeholder}
    </BodyCopy>
  </label>
);

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
