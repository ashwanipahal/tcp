/* eslint-disable jsx-a11y/label-has-for */
/** @module LabeledSelect
 * @summary A React component rendering an HTML select with a label and optional validation error or warning.
 *
 * The currently selected item is also rendered in a <code>span</code> element that can be overlaid (using appropriate CSS)
 * on top of the <code>select</code> element to provide a custom look.
 *
 * Supports <code>input</code> and <code>meta</code> props passed down by a wrapping {@linkcode module:redux-form.Field} HOC.
 * Any extra props (i.e., other than <code>name, title, placeholder, alwaysShowPlaceholder, className, isHideIfEmptyOptionsMap,
 * showErrorIfUntouched, showWarningIfUntouched, input, meta</code>),
 * e.g., <code>disabled</code>, passed to this component will be passed along to the rendered <code>select</code> element.
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import cssClassName from '../../../../../utils/cssClassName';
import ErrorMessage, { ERROR_FORM_NAME_DATA_ATTRIBUTE } from '../../../hoc/ErrorMessage';

const deriveErrorAttributes = (
  meta,
  showErrorIfUntouched,
  showWarningIfUntouched,
  dontShowErrorOrWarning
) => {
  const { touched, error, warning, form = '' } = meta;
  const showError = !dontShowErrorOrWarning && error && (touched || showErrorIfUntouched);
  const showWarning =
    !dontShowErrorOrWarning && !showError && warning && (touched || showWarningIfUntouched);
  const dataAttributes = showError || showWarning ? { [ERROR_FORM_NAME_DATA_ATTRIBUTE]: form } : {};

  return {
    showError,
    showWarning,
    dataAttributes,
  };
};

class LabeledSelect extends React.Component {
  static propTypes = {
    /** The text to display in the label for this input field. */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,

    /**
     * Optional placeholder text to be shown when the current value of this component does not match any option.
     * It is also used as the first (disabled) item in the dropdown (see the alwaysShowPlaceholder below)
     * defaults to 'Select'.
     */
    placeholder: PropTypes.string,

    /** Flags if the placeholder text should be visible as the first option in the dropdown
     * also when a valid option is selected. If false, the placeholder text it is only visible when the
     * current value of the select does not match any of the options, and the placeholder text is not falsy.
     */
    alwaysShowPlaceholder: PropTypes.bool,

    /** The CSS class to use for the title text (please fix this comnment to be more accurate) */
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

    /** flags to not show any errors or warnings */
    dontShowErrorOrWarning: PropTypes.bool,

    /**
     * Array with value and text for each select option.
     * Please note that the id of all entries should not be the empty string,
     * as the empty string designates that no option is selected
     */
    optionsMap: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, // the value
        displayName: PropTypes.string.isRequired, // the text to display
        disabled: PropTypes.bool,
      })
    ).isRequired,

    /** Flags if to hide this component when the optionsMap is empty */
    isHideIfEmptyOptionsMap: PropTypes.bool,
    children: PropTypes.node.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
      form: PropTypes.string,
    }),

    /**
     * If using Redux-forms, this is passed down to this object automatically by the enclosing <code>Field</code> component.
     */
    input: PropTypes.shape({
      /**
       * The value of the selected item. Note that this value may be different than all the values in the <code>itemsMap</code> prop.
       */
      value: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    placeholder: 'Select',
    meta: {},
    isHideIfEmptyOptionsMap: true,
    dontShowErrorOrWarning: false,
    showErrorIfUntouched: false,
    showWarningIfUntouched: false,
    alwaysShowPlaceholder: true,
    className: '',
  };

  static labeledSelectCounter = 0;

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.labeledSelectCounter = LabeledSelect.labeledSelectCounter;
    LabeledSelect.labeledSelectCounter += 1;
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  getSelectedText() {
    const { input, optionsMap } = this.props;
    const selectedOption = input && optionsMap.find(option => option.id === input.value);
    return selectedOption && selectedOption.displayName;
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
      optionsMap,
      title,
      className,
      showErrorIfUntouched,
      showWarningIfUntouched,
      dontShowErrorOrWarning,
      input, // When using redux-form, is passed implicitly by a wrapping Field component
      meta, // When using redux-form, is passed implicitly by a wrapping Field component
      children,
      isHideIfEmptyOptionsMap,
      placeholder,
      alwaysShowPlaceholder,
      ...otherProps // all the extra props passed to this component (or the wrapping Field component when using redux-form)
    } = this.props;

    if (isHideIfEmptyOptionsMap && optionsMap.length === 0) {
      return null; // render nothing
    }

    const selectedText = this.getSelectedText();
    const { error, warning } = meta;
    const { isFocused } = this.state;

    const { showError, showWarning, dataAttributes } = deriveErrorAttributes(
      meta,
      showErrorIfUntouched,
      showWarningIfUntouched,
      dontShowErrorOrWarning
    );

    const containingClassName = cssClassName('select-common ', className, {
      ' label-error': showError,
      ' label-warning': showWarning,
      ' select-focused': isFocused,
    });
    const inputClassName = cssClassName({ 'input-error': showError, 'input-warning': showWarning });
    const messageClassName = cssClassName('inline-', {
      'error-message': showError,
      'warning-message': showWarning,
    });
    const name = `labeled-select_${this.labeledSelectCounter}`;
    const errorUniqueId = `error_${name}`; // Unique Id to connect the error input with its error message. Both needs to be the same. Accessibility requirement. DT-30852

    return (
      <div className={containingClassName}>
        <label htmlFor={name} {...dataAttributes} tabIndex="-1">
          <span className="labled-select-title">{title}</span>
          <select
            {...input}
            {...otherProps}
            id={name}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            aria-describedby={errorUniqueId}
          >
            {placeholder && (alwaysShowPlaceholder || !selectedText) && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {optionsMap.map(optionEntry => (
              <option key={optionEntry.id} value={optionEntry.id} disabled={optionEntry.disabled}>
                {optionEntry.displayName}
              </option>
            ))}
          </select>
          <span
            className={cssClassName('selection ', inputClassName, {
              ' select-option-selected': selectedText,
            })}
          >
            {selectedText || placeholder}
          </span>
          {children}
        </label>
        <ErrorMessage
          isShowingMessage={!!showError || !!showWarning}
          errorId={errorUniqueId}
          className={messageClassName}
          error={showError ? error : warning}
          withoutErrorDataAttribute
        />
      </div>
    );
  }
}

export default LabeledSelect;
