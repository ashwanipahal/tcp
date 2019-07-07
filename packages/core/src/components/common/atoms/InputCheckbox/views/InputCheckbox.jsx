import React from 'react';
import type { Node } from 'react';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../BodyCopy';
import styles from '../InputCheckbox.style';

// @flow

type Props = {
  children: Node,
  className: ?string,
  ariaLabel: ?string,
  disabled: ?boolean,
  input: any,
  name: ?string,
};

const InputCheckbox = ({ children, className, ariaLabel, input, name }: Props): Node => (
  <label htmlFor={name} className={className}>
    <input
      id={name}
      aria-label={ariaLabel}
      className="CheckBox__input"
      name={name}
      type="checkbox"
      {...input}
    />
    <BodyCopy fontSize="fs12" fontFamily="secondary">
      {children}
    </BodyCopy>
  </label>
);

export default withStyles(InputCheckbox, styles);
export { InputCheckbox as InputCheckboxVanilla };
