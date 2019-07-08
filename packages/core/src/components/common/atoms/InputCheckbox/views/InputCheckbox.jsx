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

const InputCheckbox = ({ children, className, ariaLabel, input, dataLocator }: Props): Node => (
  <label htmlFor={input.name} className={className}>
    <input
      id={input.name}
      aria-label={ariaLabel}
      className="CheckBox__input"
      type="checkbox"
      {...input}
      data-locator={dataLocator}
    />
    <BodyCopy fontSize="fs12" fontFamily="secondary">
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
