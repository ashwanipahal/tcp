import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import StyledTextBox from '../TextBox.style';

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
}) => (
  <input
    id={id}
    aria-label={ariaLabel}
    className={className}
    name={name}
    type={type}
    placeholder={placeholder}
    isErrorState={isErrorState}
    isSuccessState={isSuccessState}
    onChange={onChangeHandler}
  />
);

TextBox.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isSuccessState: PropTypes.bool,
  isErrorState: PropTypes.bool,
  onChangeHandler: PropTypes.func,
};

TextBox.defaultProps = {
  ariaLabel: '',
  type: 'text',
  placeholder: '',
  isSuccessState: false,
  isErrorState: false,
  onChangeHandler: () => {},
};

export default withStyles(TextBox, StyledTextBox);
export { TextBox as TextBoxVanilla };
