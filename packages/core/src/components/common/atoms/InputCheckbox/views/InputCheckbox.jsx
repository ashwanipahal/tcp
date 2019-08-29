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
};

const InputCheckbox = ({
  children,
  className,
  ariaLabel,
  input,
  disabled,
  dataLocator,
  meta,
}: Props): Node => {
  const { touched, error } = meta;
  const errorMessagea11yLbl = `checkbox__error__${input.name}`;

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
          checked={input.value}
          disabled={disabled}
          aria-describedby={errorMessagea11yLbl}
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
            id={errorMessagea11yLbl}
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
};

export default withStyles(InputCheckbox, styles);
export { InputCheckbox as InputCheckboxVanilla };
