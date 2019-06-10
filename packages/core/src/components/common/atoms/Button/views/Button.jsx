import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import styles from '../Button.style';

// The two variations of buttons are:
// 1. fixed-width: Takes the width of the column which it occupies.
// It has the fixed padding as per the zeplin.

// 2. variable-width: Takes the width of the text that is inside the button.
// It has fixed padding as per the zeplin. This variation needs to be mentioned in buttonVariation property.
// TODO - Not able to add these property here due to linting,
// need to find a way of doing it. Might be resolved with flow types.

// Additional button Prop:
// fullWidth: Additional property to mention 100% width of the button.
// disabled: to have disabled state of the button

const Button = ({ children, className, ariaLabel, disabled, fullWidth }) => (
  <button
    disabled={disabled}
    aria-label={ariaLabel}
    className={className}
    // Type is hard coded to button for two reasons:
    // 1. submit and reset type of button should be different from this component
    // 2. type dynamic value is not allowed, it throws linting error.
    type="button"
    fullWidth={fullWidth}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  fullWidth: true,
  ariaLabel: '',
  disabled: false,
};

export default withStyles(Button, styles);
export { Button as ButtonVanilla };
