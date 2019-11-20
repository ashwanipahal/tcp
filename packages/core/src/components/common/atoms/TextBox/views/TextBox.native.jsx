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
  StyledSuccessCheck,
} from '../TextBox.style.native';
import Image from '../../Image';

const errorIcon = require('../../../../../assets/alert-triangle.png');
const successIcon = require('../../../../../assets/success-icon.png');
const successCircleIcon = require('../../../../../assets/circle-check-fill.png');

export class TextBox extends React.Component {
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
    marginBottom: PropTypes.bool,
    showSuccessCheck: PropTypes.bool,
    successText: PropTypes.string,
    onChangeText: PropTypes.func,
    autoCapitalize: PropTypes.string,
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
    marginBottom: true,
    showSuccessCheck: false,
    successText: '',
    autoCapitalize: 'sentences',
    onChangeText: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  handleFocus = () => {
    this.setState({
      isFocused: true,
    });
  };

  handleBlur = () => {
    const { input } = this.props;
    this.setState({
      isFocused: false,
    });
    if (input.onBlur !== undefined) input.onBlur(input.value);
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
              <Image source={errorIcon} width="16px" height="14px" />
            </StyledErrorIcon>
          )}
          <BodyCopy
            fontFamily="secondary"
            fontWeight="extrabold"
            fontSize="fs12"
            text={error}
            color="error"
          />
        </StyledErrorWrapper>
      );
    }
    return null;
  };

  validateInputSuccess = () => {
    const {
      meta: { invalid, asyncValidating, active },
    } = this.props;
    return !active && !invalid && !asyncValidating;
  };

  getSuccessMsg = () => {
    const { showSuccessCheck, successText } = this.props;

    if (showSuccessCheck && this.validateInputSuccess()) {
      return (
        <StyledErrorWrapper>
          <StyledSuccessCheck>
            <Image source={successCircleIcon} width="18px" height="18px" />
          </StyledSuccessCheck>
          <BodyCopy
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize="fs12"
            text={successText}
            color="success"
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
      meta,
      input,
      enableSuccessCheck,
      keyboardType,
      secureTextEntry,
      onChangeText,
      autoCapitalize,
    } = this.props;
    return (
      <View>
        <StyledLabel isFocused={elemValue || isFocused}>{label}</StyledLabel>
        <StyledTextBox
          {...input}
          {...others}
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
          autoCapitalize={autoCapitalize}
          returnKeyType="next"
          enableSuccessCheck={enableSuccessCheck}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          meta={meta}
          error={meta.error}
          validateInput={this.validateInputSuccess()}
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
    const {
      type,
      input,
      meta: { error },
      showErrorIcon,
      marginBottom,
      ...others
    } = this.props;
    const { isFocused } = this.state;
    const elemValue = input.value;
    return (
      <View>
        {type === 'hidden' ? (
          <View>
            <HiddenView>{this.renderTextBox({ elemValue, isFocused, ...others })}</HiddenView>
            {this.getErrorMsg()}
          </View>
        ) : (
          <View>
            {this.renderTextBox({ elemValue, isFocused, others })}
            {!this.validateInputSuccess() && (
              <StyledTextBoxWrapper marginBottom={marginBottom}>
                {this.getErrorMsg()}
              </StyledTextBoxWrapper>
            )}
            {!error && (
              <StyledTextBoxWrapper marginBottom={marginBottom}>
                {this.getSuccessMsg()}
              </StyledTextBoxWrapper>
            )}
          </View>
        )}
      </View>
    );
  }
}

// export default TextBox;
export default withStyles(TextBox, TextBoxStyle);
export { TextBox as TextBoxVanilla };
