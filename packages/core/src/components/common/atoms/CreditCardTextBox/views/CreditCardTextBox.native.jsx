import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BodyCopy from '../../BodyCopy';
import withStyles from '../../../hoc/withStyles';

import {
  TextBoxStyle,
  StyledTextBox,
  StyledLabel,
  StyledErrorIcon,
  StyledErrorWrapper,
  StyledTextBoxWrapper,
  StyledSuccessIcon,
  HiddenView,
} from '../CreditCardTextBox.style.native';
import Image from '../../Image';

const errorIcon = require('../../../../../assets/alert-triangle.png');
const successIcon = require('../../../../../assets/success-icon.png');

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
    showErrorIcon: PropTypes.bool,
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
    showErrorIcon: true,
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
      showErrorIcon,
    } = this.props;
    if (touched && error) {
      return (
        <StyledErrorWrapper>
          {showErrorIcon && (
            <StyledErrorIcon>
              <Image source={errorIcon} width="15px" height="15px" />
            </StyledErrorIcon>
          )}
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
        {enableSuccessCheck && (
          <StyledSuccessIcon>
            <Image source={successIcon} width="15px" height="12px" />
          </StyledSuccessIcon>
        )}
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
        {type === 'hidden' ? (
          <View>
            <HiddenView>{this.renderTextBox({ elemValue, isFocused, others })}</HiddenView>
            {this.getErrorMsg()}
          </View>
        ) : (
          <View>
            {this.renderTextBox({ elemValue, isFocused, others })}
            <StyledTextBoxWrapper>{this.getErrorMsg()}</StyledTextBoxWrapper>
          </View>
        )}
      </View>
    );
  }
}

// export default TextBox;
export default withStyles(CreditCardTextBox, TextBoxStyle);
export { CreditCardTextBox as CreditCardTextBoxVanilla };
