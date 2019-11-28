import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../BodyCopy';
import Image from '../../Image';
import {
  StyledErrorWrapper,
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '../../styledWrapper/styledWrapper.native';
import { StyledTextInput } from '../TextArea.style.native';

const errorIcon = require('../../../../../assets/alert-triangle.png');

const TextArea = ({
  input,
  meta,
  id,
  name,
  meta: { error, touched },
  label,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
}) => {
  const [focused, setFocused] = useState(false);

  const onFocusHandler = () => {
    setFocused(true);
  };

  const onBlurHandler = () => {
    setFocused(false);
    if (input.onBlur) {
      input.onBlur();
    }
  };

  const onChangeHandler = text => {
    if (input.onChange) {
      input.onChange(text);
    }
  };

  return (
    <View>
      {label && (
        <BodyCopyWithSpacing
          fontFamily="secondary"
          fontSize="fs12"
          fontWeight="regular"
          color="gray.900"
          text={label}
          spacingStyles="margin-bottom-XS"
        />
      )}
      <StyledTextInput
        id={id}
        name={name}
        value={input.value}
        onChangeText={onChangeHandler}
        multiline
        numberOfLines={4}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onEndEditing={onBlurHandler}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        returnKeyType="next"
      />
      {!focused && error && touched && (
        <StyledErrorWrapper>
          <ViewWithSpacing spacingStyles="margin-right-XS">
            <Image source={errorIcon} width="16px" height="14px" />
          </ViewWithSpacing>
          <BodyCopy
            fontFamily="secondary"
            fontWeight="extrabold"
            fontSize="fs12"
            text={error}
            color="error"
          />
        </StyledErrorWrapper>
      )}
    </View>
  );
};

TextArea.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
};

TextArea.defaultProps = {
  input: {},
  meta: {},
  label: '',
  keyboardType: 'default',
  secureTextEntry: false,
  autoCapitalize: 'sentences',
};

export default TextArea;
