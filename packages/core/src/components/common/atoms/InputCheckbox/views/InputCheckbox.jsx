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
  meta?: { touched: any, error: any, warning: any },
  checked?: boolean,
};

const InputCheckbox = ({
  children,
  className,
  ariaLabel,
  input,
  disabled,
  dataLocator,
  meta,
  checked,
}: Props): Node => {
  const { touched, error } = meta;
  return (
    <React.Fragment>
      <label htmlFor={input.name} className={className}>
        <input
          {...input}
          id={input.name}
          aria-label={ariaLabel}
          className="CheckBox__input"
          type="checkbox"
          data-locator={dataLocator}
          checked={input.value || checked}
          disabled={disabled}
        />
        <BodyCopy
          fontSize="fs12"
          fontFamily="secondary"
          className={`CheckBox__text ${disabled ? 'disabled' : ''}`}
        >
          {children}
        </BodyCopy>

        <div className="Checkbox__error" component="div">
          <span className={touched && error ? 'warning-icon' : ''} aria-disabled="true" />
          <BodyCopy
            color="error"
            component="div"
            fontSize="fs12"
            fontFamily="secondary"
            fontWeight="semibold"
            role="alert"
            aria-live="assertive"
            data-locator="errorDataLocator"
          >
            {touched && error ? error : ''}
          </BodyCopy>
        </div>
      </label>
    </React.Fragment>
  );
};

InputCheckbox.defaultProps = {
  ariaLabel: '',
  dataLocator: '',
  input: {},
  meta: {},
  checked: false,
};

export default withStyles(InputCheckbox, styles);
export { InputCheckbox as InputCheckboxVanilla };
