import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../BodyCopy';

import {
  StyledTextBox,
  StyledLabel,
  StyledErrorIcon,
  StyledErrorWrapper,
  StyledTextBoxWrapper,
  StyledSuccessIcon,
} from '../TextBox.style.native';
import Image from '../../Image';

const errorIcon = require('../../../../../assets/alert-triangle.png');
const successIcon = require('../../../../../assets/success-icon.png');

class TextBox extends React.Component {
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
    showSuccessCheck: PropTypes.bool,
    label: PropTypes.string,
    keyboardType: PropTypes.string,
    showErrorIcon: PropTypes.bool,
  };

  static defaultProps = {
    id: 'input',
    ariaLabel: 'input',
    type: 'text',
    meta: { touched: '', error: '' },
    dataLocator: 'input-field',
    showSuccessCheck: false,
    label: 'input',
    keyboardType: 'default',
    showErrorIcon: true,
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

  getErrorMsg = ({ touched, error, showErrorIcon }) => {
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

  render() {
    const {
      id,
      ariaLabel,
      type,
      maxLength,
      inputRef,
      dataLocator,
      label,
      meta: { touched, error },
      input,
      showErrorIcon,
      showSuccessCheck,
      keyboardType,
    } = this.props;
    const { isFocused } = this.state;
    const elemValue = input.value;
    return (
      <StyledTextBoxWrapper>
        <StyledLabel isFocused={elemValue || isFocused}>{label}</StyledLabel>
        <StyledTextBox
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
          showSuccessCheck={showSuccessCheck}
        />
        {showSuccessCheck && (
          <StyledSuccessIcon>
            <Image source={successIcon} width="15px" height="12px" />
          </StyledSuccessIcon>
        )}
        {this.getErrorMsg({ touched, error, showErrorIcon })}
      </StyledTextBoxWrapper>
    );
  }
}

export default TextBox;
