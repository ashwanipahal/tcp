// @flow
import React from 'react';
import type { Node } from 'react';
import withStyles from '../../../hoc/withStyles';

import styles from '../Button.style';

type Props = {
  children: Node,
  className: string,
  ariaLabel: string,
  disabled: boolean,
  fullWidth?: boolean,
  type?: string,
  dataLocator?: string,
  customStyle?: string,
  buttonVariation?: string,
};

/**
 * @param {object} props : Props for button
 * @desc This is a button component. The two variations of buttons are:
 * 1. fixed-width: Takes the width of the column which it occupies.
 * It has the fixed padding as per the zeplin.

 * 2. variable-width: Takes the width of the text that is inside the button.
 * It has fixed padding as per the zeplin. This variation needs to be mentioned in buttonVariation property.
 * TODO - Not able to add these property here due to linting,
 * need to find a way of doing it. Might be resolved with flow types.

 * Additional button Prop:
 * fullWidth: Additional property to mention 100% width of the button.
 * disabled: to have disabled state of the button
 */
const Button = ({
  children,
  className,
  ariaLabel,
  disabled,
  fullWidth,
  dataLocator,
  type,
  customStyle,
  buttonVariation,
  ...otherProps
}: Props): Node => (
  <button
    disabled={disabled}
    aria-label={ariaLabel}
    className={className}
    type={type}
    fullWidth={fullWidth}
    data-locator={dataLocator}
    {...otherProps}
  >
    {children}
  </button>
);

Button.defaultProps = {
  fullWidth: true,
  type: 'button',
  dataLocator: 'btn',
  customStyle: '',
  buttonVariation: '',
};

export default withStyles(Button, styles);
export { Button as ButtonVanilla };
