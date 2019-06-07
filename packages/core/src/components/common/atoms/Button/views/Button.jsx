import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import styles from '../Button.style';

const Button = ({ children, className, ariaLabel, disabled, fullWidth }) => (
  <button
    disabled={disabled}
    aria-label={ariaLabel}
    className={className}
    type="button"
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
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  fullWidth: true,
};

export default withStyles(Button, styles);
export { Button as ButtonVanilla };
