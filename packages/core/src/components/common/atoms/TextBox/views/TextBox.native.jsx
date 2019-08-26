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
} from '../TextBox.style.native';
import Image from '../../Image';

const errorIcon = require('../../../../../assets/alert-triangle.png');
const successIcon = require('../../../../../assets/success-icon.png');

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
    const { type, input, marginBottom, ...others } = this.props;
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
              <StyledTextBoxWrapper marginBottom={marginBottom}>{this.getErrorMsg()}</StyledTextBoxWrapper>
            </View>
          )}
      </View>
    );
  }
}

// export default TextBox;
export default withStyles(TextBox, TextBoxStyle);
export { TextBox as TextBoxVanilla };
