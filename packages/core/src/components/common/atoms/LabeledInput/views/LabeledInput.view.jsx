/** @module LabeledInput
 * @summary A React component rendering an input field with a label and optional validation error or warning.
 *
 * @author Ben
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import cssClassName from '../../../../../utils/cssClassName';
import ErrorMessage, { ERROR_FORM_NAME_DATA_ATTRIBUTE } from '../../../hoc/ErrorMessage';
import BodyCopy from '../../BodyCopy';

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
 * @summary A React component rendering an input field with a label and optional validation error or warning.
 *
 * Supports <code>input</code> and <code>meta</code> props passed down by a wrappping {@linkcode module:redux-form.Field} HOC.
 * Any extra props (i.e., other than <code>name, title, className, showErrorIfUntouched, showWarningIfUntouched, input, meta</code>),
 * e.g., <code>type, disabled, placeholder</code>, passed to this component will be passed along to the rendered <code>input</code> element.
 *
 * @example <caption>Usage</caption>
 * <LabeledInput name="fname" title="First Name" placeholder="enter your first name">
 *
 * @example <caption>Usage with redux-form</caption>
 * import {Field} from 'redux-form';
 * //
 * <Field component={LabeledInput} className="input-first-name" name="fname" title="First Name" type="text" placeholder="enter your first name" />
 */

class LabeledInput extends React.Component {
  static propTypes = {
    /** The text to display in the label for this input field. */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    /** The CSS class to use for the title text(please fix this comnment to be more accurate) */
    className: PropTypes.string,
    /**
     * If <code>true</code>, and there is a validation error associated with the input value (i.e, </code>this.props.meta.error</code> is not empty)
     * then the error message will be displayed even if </code>this.props.meta.touched</code> is <code>false</code>.
     */
    showErrorIfUntouched: PropTypes.bool,
    /**
     * If <code>true</code>, and there is a validation error associated with the input value (i.e, </code>this.props.meta.error</code> is not empty)
     * then the error message will be displayed even if </code>this.props.meta.touched</code> is <code>false</code>.
     */
    showWarningIfUntouched: PropTypes.bool,
    /** A value for the React <code>ref</code> property of the rendered input element
     * Note that the <code>ref</code> prop of this element refers to this LabeledInpot component,
     * and not to the rendered HTML input element like this prop.
     */
    inputRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    children: PropTypes.node.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
      form: PropTypes.string,
    }),
    type: PropTypes.string,
    placeholder: PropTypes.string,
    input: PropTypes.elementType,
  };

  static defaultProps = {
    className: '',
    showErrorIfUntouched: false,
    showWarningIfUntouched: false,
    inputRef: '',
    meta: {},
    type: 'text',
    placeholder: '',
    input: null,
  };

  static labeledInputCount = 0;

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.labeledInputCount = LabeledInput.labeledInputCount;
    LabeledInput.labeledInputCount += 1;

    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handles blur events of the input element of this component
  handleBlur(event) {
    this.setState({
      isFocused: false,
    });

    // notify our listeners that this component is blured
    const { input } = this.props;
    if (input && input.onBlur) input.onBlur(event);
  }

  // handles focus events of the input element of this component
  handleFocus(event) {
    this.setState({
      isFocused: true,
    });
    const { input } = this.props;
    // notify our listeners that this component is blured
    if (input && input.onFocus) input.onFocus(event);
  }

  // handles change events of the input element of this component
  handleChange(event) {
    const { input } = this.props;
    // notify our listeners that this component is blured
    if (input && input.onChange) input.onChange(event);
  }

  render() {
    const {
      title,
      className,
      showErrorIfUntouched,
      showWarningIfUntouched,
      inputRef,
      input, // When using redux-form, is passed implicitly by a wrapping Field component
      meta, // When using redux-form, is passed implicitly by a wrapping Field component
      children,
      type,
      placeholder,
      ...otherProps // all the extra props passed to this component (or the wrapping Field component when using redux-form)
    } = this.props;
    const { showError, showWarning, errorMessage, dataAttributes } = deriveErrorAttributes(
      meta,
      showErrorIfUntouched,
      showWarningIfUntouched
    );

    const { isFocused } = this.state;

    const containingClassName = cssClassName('input-common ', className, {
      ' label-error': showError,
      ' label-warning': showWarning,
    });
    const inputClassName = cssClassName({ 'input-error': showError, 'input-warning': showWarning });
    const titleClassName = cssClassName('input-title ', {
      'input-title-placeholder ': !isFocused && input.value === '',
    });
    const messageClassName = cssClassName('inline-', {
      'error-message': showError,
      'warning-message': showWarning,
    });
    const name = input && input.name ? input.name : otherProps.name;
    const uniqueId = `${name}_${this.labeledInputCount}`;
    const errorUniqueId = `error_${uniqueId}`; // Unique Id to connect the error input with its error message. Both needs to be the same. Accessibility requirement. DT-30852

    return (
      <div className={containingClassName}>
        <label htmlFor={uniqueId} {...dataAttributes} tabIndex="-1">
          {typeof title === 'string' ? (
            <BodyCopy className={titleClassName}>
              {input.value === '' && !!placeholder ? placeholder : title}
            </BodyCopy>
          ) : (
            title
          )}
          <input
            id={uniqueId}
            type={type}
            className={inputClassName}
            {...input}
            {...otherProps}
            ref={inputRef}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            placeholder={placeholder || ''}
            aria-describedby={errorUniqueId}
          />
          {children}
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

export default LabeledInput;
