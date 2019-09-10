import React from 'react';
import { PropTypes } from 'prop-types';
import cssClassName from '../../../../../utils/cssClassName';
import ErrorMessage, { ERROR_FORM_NAME_DATA_ATTRIBUTE } from '../../../hoc/ErrorMessage';

const deriveErrorAttributes = (meta, showErrorIfUntouched, showWarningIfUntouched) => {
  const { touched, error, warning, form = '' } = meta;
  const showError = error && (touched || showErrorIfUntouched);
  const showWarning = !showError && warning && (touched || showWarningIfUntouched);
  // If there is an error then show it; otherwise, if there is a warning then show it
  let errorMessage = null;
  if (showError) {
    errorMessage = error;
  } else if (showWarning) {
    errorMessage = warning;
  }
  const dataAttributes = showError || showWarning ? { [ERROR_FORM_NAME_DATA_ATTRIBUTE]: form } : {};

  return {
    showError,
    showWarning,
    errorMessage,
    dataAttributes,
  };
};

/**
 * @summary A React component rendering an checkbox field with a  optional data .
 *
 * Supports <code>input</code> and <code>meta</code> props passed down by a wrappping {@linkcode module:redux-form.Field} HOC.
 * Any extra props (i.e., other than <code>type, title, subTitle, className, meta</code>),
 * e.g., <code>disabled, placeholder</code>, passed to this component will be passed along to the rendered <code>input</code> element.
 *
 * @example <caption>Usage</caption>
 * <LabeledCheckboxhButton name="fname" title="First Name" SubTitile={SubtTitle}>
 *
 * @example <caption>Usage with redux-form</caption>
 * import {Field} from 'redux-form';
 * //
 * <Field component={LabeledCheckboxhButton} className="input-first-name" name="fname" title="First Name" type="text"  />
 */
class LabeledCheckbox extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    input: PropTypes.elementType,
    showErrorIfUntouched: PropTypes.bool,
    showWarningIfUntouched: PropTypes.bool,
    disabled: PropTypes.bool,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
      form: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    title: '',
    subtitle: '',
    className: '',
    input: null,
    showErrorIfUntouched: false,
    showWarningIfUntouched: false,
    meta: {},
    disabled: false,
  };

  static labeledCheckboxCount = 0;

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.labeledInputCount = LabeledCheckbox.labeledCheckboxCount;
    LabeledCheckbox.labeledCheckboxCount += 1;
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus(event) {
    this.setState({
      isFocused: true,
    });
    const { input } = this.props;
    if (input && input.onFocus) input.onFocus(event);
  }

  handleBlur(event) {
    this.setState({
      isFocused: false,
    });
    const { input } = this.props;
    if (input && input.onBlur) input.onBlur(event);
  }

  render() {
    const {
      title,
      subtitle,
      className,
      input, // When using redux-form, is passed implicitly by a wrapping Field component
      showErrorIfUntouched,
      showWarningIfUntouched,
      meta /* When using redux-form, is passed implicitly by a wrapping Field component */, // eslint-disable-line
      children,
      disabled,
      ...otherProps // all the extra props passed to this component (or the wrapping Field component when using redux-form)
    } = this.props;

    const { showError, showWarning, errorMessage, dataAttributes } = deriveErrorAttributes(
      meta,
      showErrorIfUntouched,
      showWarningIfUntouched
    );

    const { isFocused } = this.state;
    const inputChecked = input && !!input.value;
    const containingClassName = cssClassName('label-checkbox input-checkbox ', className, {
      ' label-error': showError,
      ' label-warning': showWarning,
    });
    const inputClassName = cssClassName({ 'input-error': showError, 'input-warning': showWarning });
    const messageClassName = cssClassName('inline-', {
      'error-message': showError,
      'warning-message': showWarning,
    });
    const inputContainerClassName = cssClassName({
      'input-checkbox-disabled ': disabled,
      'input-checkbox-icon-checked ': inputChecked,
      'input-checkbox-icon-unchecked ': !inputChecked,
      'input-checkbox-focused ': isFocused,
    });
    const name = input && input.name ? input.name : otherProps.name;
    const uniqueId = `${name}_${this.labeledInputCount}`;
    // checked value comes from input prop (if wraped with a redux-form Field), otherwise as usual from checked attribute

    const errorUniqueId = `error_${uniqueId}`; // Unique Id to connect the error input with its error message. Both needs to be the same. Accessibility requirement. DT-30852
    return (
      <div className={containingClassName}>
        <label htmlFor={uniqueId} {...dataAttributes} tabIndex="-1">
          <div className={inputContainerClassName}>
            <input
              {...otherProps}
              id={uniqueId}
              disabled={disabled}
              {...input}
              className={`${inputClassName || ''}`}
              type="checkbox"
              checked={input && !!input.value}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              aria-describedby={errorUniqueId}
            />
          </div>
          {children && <div className="input-checkbox-title">{children}</div>}
          {title && <span className="input-checkbox-title">{title}</span>}
          {subtitle && <span className="input-subtitle">{subtitle}</span>}
        </label>
        {/* If there is an error then show it; otherwise, if there is a warning then show it */}
        <ErrorMessage
          isShowingMessage={!!showError || !!showWarning}
          errorId={errorUniqueId}
          className={messageClassName}
          error={errorMessage}
          withoutErrorDataAttribute
        />
      </div>
    );
  }
}

export default LabeledCheckbox;
