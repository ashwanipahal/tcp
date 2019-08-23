/** @module LabeledRadioButton
 * @summary A React component rendering an RadioButton field
 *
 * @author Ben
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import styles from '../styles/LabeledRadioButton.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../BodyCopy';

/**
 * @summary A React component rendering an checkbox field with a  optional data .
 *
 * Supports <code>input</code> and <code>meta</code> props passed down by a wrappping {@linkcode module:redux-form.Field} HOC.
 * Any extra props (i.e., other than <code>title, subTitle, type, className, meta</code>),
 * e.g., <code>value, disabled, placeholder</code>, passed to this component will be passed along to the rendered <code>input</code> element.
 */
class LabeledRadioButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    variation: PropTypes.string,
    /** The value of the radioButton (i.e., the value of the associated form field when this radio button is checked) */
    selectedValue: PropTypes.string.isRequired,
    children: PropTypes.node,
    name: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    input: PropTypes.shape({}),
  };

  static defaultProps = {
    title: null,
    subtitle: null,
    className: '',
    variation: 'primary',
    children: null,
    name: '',
    checked: false,
    disabled: false,
    input: null,
  };

  static labeledRadioButtonCounter = 0;

  constructor(props) {
    super(props);
    LabeledRadioButton.labeledRadioButtonCounter += 1;
    this.labeledRadioButtonCounter = LabeledRadioButton.labeledRadioButtonCounter;
  }

  render() {
    const {
      title,
      subtitle,
      className,
      input, // When using redux-form, is passed implicitly by a wrapping Field component
      meta /* When using redux-form, is passed implicitly by a wrapping Field component */, // eslint-disable-line
      children,
      disabled,
      selectedValue,
      checked,
      name,
      variation,
      ...otherProps // all the extra props passed to this component (or the wrapping Field component when using redux-form)
    } = this.props;
    const inputName = input && input.name ? input.name : name;
    const id = `${inputName}_${this.labeledRadioButtonCounter}`;
    const isChecked = (input && selectedValue === input.value) || checked;
    return (
      <label htmlFor={id} className={className} isChecked={isChecked}>
        <div className={`radio-button${isChecked ? '-checked' : ''}`}>
          <input
            {...input}
            {...otherProps}
            id={id}
            disabled={disabled}
            type="radio"
            className={disabled ? 'disabled' : null}
            value={selectedValue}
            checked={isChecked}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
        {children && <div>{children}</div>}
        {title && (
          <BodyCopy
            className="input-radio-title"
            component="span"
            fontFamily="secondary"
            fontSize="fs16"
          >
            {title}
          </BodyCopy>
        )}
        {subtitle && (
          <BodyCopy
            className="input-subtitle"
            component="span"
            fontFamily="secondary"
            fontSize="fs12"
          >
            {subtitle}
          </BodyCopy>
        )}
      </label>
    );
  }
}

export default withStyles(LabeledRadioButton, styles);
