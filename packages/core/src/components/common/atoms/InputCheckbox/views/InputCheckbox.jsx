import React from 'react';
import type { Node } from 'react';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../BodyCopy';
import styles from '../InputCheckbox.style';

// @flow

type Props = {
  children: Node,
  className: string,
  ariaLabel?: string,
  disabled: ?boolean,
  input?: any,
  dataLocator?: string,
};

const InputCheckbox = ({
  children,
  className,
  ariaLabel,
  input,
  disabled,
  dataLocator,
}: Props): Node => (
  <label htmlFor={input.name} className={className}>
    <input
      {...input}
      id={input.name}
      aria-label={ariaLabel}
      className="CheckBox__input"
      type="checkbox"
      data-locator={dataLocator}
      checked={input.value}
      disabled={disabled}
    />
    <BodyCopy fontSize="fs12" fontFamily="secondary" className={disabled ? 'disabled' : ''}>
      {children}
    </BodyCopy>
  </label>
);

InputCheckbox.defaultProps = {
  ariaLabel: '',
  dataLocator: '',
  input: {},
};

export default withStyles(InputCheckbox, styles);
export { InputCheckbox as InputCheckboxVanilla };
