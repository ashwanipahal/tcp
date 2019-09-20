import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { formatDate, isValidDate } from '@tcp/core/src/utils';
import withStyles from '../../../hoc/withStyles';
import TextBox from '../../../atoms/TextBox';
import styles from '../styles/DateInput.style';

/**
 * React component to render DateInput form field.
 * Used https://github.com/Hacker0x01/react-datepicker to render datePicker component
 */
export class DateInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    input: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
  };

  static defaultProps = {
    className: '',
    placeholder: '',
    input: {
      value: '',
    },
  };

  /**
   * @function
   * Will call redux-form field onChange prop to update redux form state
   */
  onChangeHandler = date => {
    const { input } = this.props;
    input.onChange(formatDate(date));
  };

  /**
   * @function
   * Will get selected date object from formatted date
   */
  getSelectedDate = dateInput => {
    if (dateInput && isValidDate(new Date(dateInput))) {
      return new Date(dateInput);
    }
    return Date.now();
  };

  render() {
    const { className, placeholder, ...otherProps } = this.props;
    const {
      input = {
        value: '',
      },
    } = otherProps;
    return (
      <DatePicker
        disabledKeyboardNavigation
        wrapperClassName="full-bleed"
        popperClassName={className}
        onChange={this.onChangeHandler}
        selected={this.getSelectedDate(input.value)}
        placeholderText={placeholder}
        customInput={<TextBox {...otherProps} />}
        popperModifiers={{
          offset: {
            offset: '0, 16px',
          },
        }}
        {...otherProps}
      />
    );
  }
}

export default withStyles(DateInput, styles);
