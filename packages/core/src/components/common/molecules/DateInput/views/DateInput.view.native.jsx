import React, { PureComponent } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, isValidDate, isIOS } from '@tcp/core/src/utils';
import TextBox from '../../../atoms/TextBox';

export class DateInput extends PureComponent {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    label: PropTypes.shape({}).isRequired,
    mode: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    maximumDate: PropTypes.instanceOf(Date).isRequired,
  };

  static defaultProps = {
    input: {
      value: '',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: new Date(),
    };
  }

  /**
   * @function
   * Will call redux-form field onChange prop to update redux form state
   */
  onChangeHandler = (event, date) => {
    this.setState({
      show: isIOS(),
      date,
    });
    const { input } = this.props;
    input.onChange(formatDate(date));
  };

  /**
   * Calls when textbox receive focus
   */
  onTextBoxPress = () => {
    const { show } = this.state;
    Keyboard.dismiss();
    this.setState({ show: !show });
  };

  render() {
    const { label, mode, display, maximumDate, input, ...otherProps } = this.props;
    const { show, date } = this.state;
    return (
      <>
        <TouchableOpacity onPress={this.onTextBoxPress} accessibilityRole="button">
          <TextBox
            label={label}
            input={input}
            pointerEvents="none"
            {...otherProps}
            editable={false}
            placeholderTextColor="black"
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            display={display}
            maximumDate={maximumDate}
            onChange={this.onChangeHandler}
            {...otherProps}
          />
        )}
      </>
    );
  }
}

export default DateInput;
