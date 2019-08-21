import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BodyCopy from '../../BodyCopy';

import {
  StyledTextBox,
  StyledLabel,
  StyledErrorWrapper,
  StyledTextBoxWrapper,
} from '../CreditCardTextBox.style.native';

export class CreditCardTextBox extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    ariaLabel: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.string,
      error: PropTypes.string,
    }),
    input: PropTypes.shape({}).isRequired,
    maxLength: PropTypes.number.isRequired,
    inputRef: PropTypes.node.isRequired,
    dataLocator: PropTypes.string,
    enableSuccessCheck: PropTypes.bool,
    label: PropTypes.string,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    isEdit: PropTypes.bool,
    val: PropTypes.string,
  };

  static defaultProps = {
    id: 'input',
    ariaLabel: 'input',
    type: 'text',
    meta: { touched: '', error: '' },
    dataLocator: 'input-field',
    enableSuccessCheck: false,
    label: 'input',
    keyboardType: 'default',
    secureTextEntry: false,
    isEdit: false,
    val: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      clearValue: false,
    };
    this.textboxValue = true;
  }

  handleFocus = () => {
    const { isEdit } = this.props;
    const { clearValue } = this.state;
    if (isEdit) {
      this.textboxValue = !(isEdit && !clearValue);
      this.setState({
        isFocused: true,
        clearValue: true,
      });
    } else {
      this.setState({
        isFocused: true,
      });
    }
  };

  handleBlur = () => {
    this.setState({
      isFocused: false,
    });
  };

  getErrorMsg = () => {
    const {
      meta: { touched, error },
    } = this.props;
    if (touched && error) {
      return (
        <StyledErrorWrapper>
          <BodyCopy
            mobilefontFamily={['secondary']}
            fontWeight="semibold"
            fontSize="fs12"
            text={error}
            color="error"
          />
        </StyledErrorWrapper>
      );
    }
    return null;
  };

  renderTextBox = ({ elemValue, isFocused, ...others }) => {
    const {
      id,
      ariaLabel,
      type,
      maxLength,
      inputRef,
      dataLocator,
      label,
      meta: { error },
      input,
      enableSuccessCheck,
      keyboardType,
      secureTextEntry,
    } = this.props;
    return (
      <View>
        <StyledLabel isFocused={elemValue || isFocused}>{label}</StyledLabel>
        <StyledTextBox
          {...others}
          {...input}
          id={id}
          aria-label={ariaLabel}
          className="TextBox__input"
          name={input.name}
          type={type}
          maxLength={maxLength}
          value={elemValue}
          ref={inputRef}
          data-locator={dataLocator}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onEndEditing={this.handleBlur}
          keyboardType={keyboardType}
          returnKeyType="next"
          error={error}
          enableSuccessCheck={enableSuccessCheck}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  };

  render() {
    const { type, input, isEdit, val, ...others } = this.props;
    const { isFocused, clearValue } = this.state;

    let elemValue = input.value;
    if (isEdit && !clearValue) {
      elemValue = this.textboxValue && clearValue ? input.value : val;
      this.textboxValue = true;
    }
    return (
      <View>
        <View>
          {this.renderTextBox({ elemValue, isFocused, others })}
          <StyledTextBoxWrapper>{this.getErrorMsg()}</StyledTextBoxWrapper>
        </View>
      </View>
    );
  }
}

export default CreditCardTextBox;
