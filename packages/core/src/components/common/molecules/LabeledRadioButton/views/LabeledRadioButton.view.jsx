/* eslint-disable complexity */
/** @module LabeledRadioButton
 * @summary A React component rendering an RadioButton field
 *
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import cssClassName from '../../../../../utils/cssClassName';

/**
 * @summary A React component rendering an checkbox field with a  optional data .
 *
 * Supports <code>input</code> and <code>meta</code> props passed down by a wrappping {@linkcode module:redux-form.Field} HOC.
 * Any extra props (i.e., other than <code>title, subTitle, type, className, meta</code>),
 * e.g., <code>value, disabled, placeholder</code>, passed to this component will be passed along to the rendered <code>input</code> element.
 */
export default class LabeledRadioButton extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    /** The value of the radioButton (i.e., the value of the associated form field when this radio button is checked) */
    selectedValue: PropTypes.string.isRequired,
    input: PropTypes.shape({
      value: PropTypes.string,
    }),
    children: PropTypes.shape({}),
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    title: 'Size: ',
    subtitle: [''],
    className: '',
    input: {
      value: {
        name: '',
      },
    },
    children: {},
    disabled: false,
    checked: false,
    style: {},
  };

  static labeledRadioButtonCounter = 0;

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    // eslint-disable-next-line no-plusplus
    this.labeledRadioButtonCounter = LabeledRadioButton.labeledRadioButtonCounter++;
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
      meta /* When using redux-form, is passed implicitly by a wrapping Field component */, // eslint-disable-line
      children,
      input,
      disabled,
      selectedValue,
      checked,
      style,
      ...otherProps // all the extra props passed to this component (or the wrapping Field component when using redux-form)
    } = this.props;

    const { isFocused } = this.state;
    const inputChecked = !disabled && ((input && selectedValue === input.name) || checked);
    const containingClassName = cssClassName('label-radio input-radio ', className);
    const inputContainerClassName = cssClassName({
      'input-radio-disabled ': disabled,
      'input-radio-icon-checked ': inputChecked,
      'input-radio-icon-unchecked ': !inputChecked,
      'input-radio-focused': !children && isFocused,
    });
    const inputChildrenClassName = cssClassName({
      'input-radio-title ': true,
      'input-radio-focused ': children && isFocused,
    });
    const name = input && input.name ? input.name : otherProps.name;
    const id = `${name}_${this.labeledRadioButtonCounter}`;

    return (
      <label htmlFor={id} className={containingClassName} style={style}>
        <div className={inputContainerClassName}>
          <input
            {...input}
            {...otherProps}
            id={id}
            disabled={disabled}
            type="radio"
            className={disabled ? 'disabled' : null}
            value={selectedValue}
            checked={input ? selectedValue === input.name : checked}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
        {children && <div className={inputChildrenClassName}>{children}</div>}
      </label>
    );
  }
}
