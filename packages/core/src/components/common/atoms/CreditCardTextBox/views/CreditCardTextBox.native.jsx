import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Image from '@tcp/core/src/components/common/atoms/Image';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import { cardIconMapping } from '@tcp/core/src/components/features/account/common/molecule/CardTile/views/CardTile.utils';

import {
  StyledTextBox,
  StyledLabel,
  StyledErrorWrapper,
  StyledTextBoxWrapper,
  ImageWrapper,
  StyledErrorIcon,
} from '../CreditCardTextBox.style.native';

const errorIcon = require('../../../../../assets/alert-triangle.png');

const getCardTypeImgUrl = cardType => {
  return getIconCard(cardIconMapping[cardType]);
};

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
    customStyle: PropTypes.shape({}),
    cardType: PropTypes.string,
    showErrorIcon: PropTypes.bool,
    onCardFocus: PropTypes.func.isRequired,
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
    customStyle: {},
    cardType: '',
    showErrorIcon: true,
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
    const { isEdit, onCardFocus } = this.props;
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
    if (onCardFocus) {
      onCardFocus();
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
      customStyle,
      cardType,
    } = this.props;
    return (
      <View>
        <StyledLabel isFocused={elemValue || isFocused}>{label}</StyledLabel>
        <StyledTextBox
          {...others}
          {...input}
          id={id}
          aria-label={ariaLabel}
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
          meta={meta}
          error={meta.error}
          enableSuccessCheck={enableSuccessCheck}
          secureTextEntry={secureTextEntry}
          {...customStyle}
        />
        {cardType !== null && (
          <ImageWrapper>
            <Image
              source={getCardTypeImgUrl(cardType)}
              width="40"
              height="30"
              resizeMode="contain"
            />
          </ImageWrapper>
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
        <View>
          {this.renderTextBox({ elemValue, isFocused, others })}
          <StyledTextBoxWrapper>{this.getErrorMsg()}</StyledTextBoxWrapper>
        </View>
      </View>
    );
  }
}

export default CreditCardTextBox;
