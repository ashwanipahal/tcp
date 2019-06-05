// Basic file for column in the grid structure
import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './Button.style';
import withStyles from '../../hoc/withStyles';

const Button = ({ children, className, ariaLabel, disabled, buttonVariation, fullWidth }) => (
  <button
    disabled={disabled}
    aria-label={ariaLabel}
    className={className}
    type="button"
    buttonVariation={buttonVariation}
    fullWidth={fullWidth}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  buttonVariation: PropTypes.string,
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  buttonVariation: 'fixed-width',
  fullWidth: true,
};

export default withStyles(Button, styles);
export { Button as ButtonVanilla };
