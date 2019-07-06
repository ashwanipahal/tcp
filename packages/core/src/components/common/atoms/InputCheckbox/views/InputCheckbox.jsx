// @flow
import React from 'react';
import type { Node } from 'react';
import withStyles from '../../../hoc/withStyles';
import errors from '../../../../../utils/errorsMsg';
import BodyCopy from '../../BodyCopy';

import styles from '../InputCheckbox.style';

type Props = {
  children: Node,
  className: string,
  ariaLabel: string,
  disabled: boolean,
  fullWidth?: boolean,
  meta: object,
  label: string,
  input: any,
  isSuccessState: boolean,
  name: string,
};

const InputCheckbox = ({
  className,
  ariaLabel,
  disabled,
  fullWidth,
  label,
  meta,
  input,
  isSuccessState,
  name,
  ...otherProps
}: Props): Node => (
  <label htmlFor={name} className={`${className} ${input.value ? 'active' : ''}`}>
    <div className="inputWrapper">
      <input
        {...input}
        id={name}
        aria-label={ariaLabel}
        className="CheckBox__input"
        name={name}
        type="checkbox"
        value={input.value}
        {...otherProps}
      />
      <BodyCopy fontSize="fs12" fontFamily="secondary">
        {label}
      </BodyCopy>
    </div>
    {meta.touched && meta.error && (
      <BodyCopy color="error" component="div" fontSize="fs12" fontFamily="secondary">
        {errors[meta.error]}
      </BodyCopy>
    )}
  </label>
);

InputCheckbox.defaultProps = {
  fullWidth: true,
};

export default withStyles(InputCheckbox, styles);
export { InputCheckbox as InputCheckboxVanilla };
