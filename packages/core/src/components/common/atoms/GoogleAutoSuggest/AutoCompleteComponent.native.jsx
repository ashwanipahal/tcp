import React, { useState } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getAPIConfig } from '@tcp/core/src/utils';
import { StyledErrorIcon, StyledErrorWrapper } from '@tcp/core/src/components/common/atoms/TextBox/TextBox.style.native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Image from '@tcp/core/src/components/common/atoms/Image';
import {
  StyledLabel,
  textInput,
  textInputContainer,
  description,
  listView,
  separator,
  poweredContainer,
  Container,
  item,
  container,
} from './AutoCompleteComponent.native.style';

const errorIcon = require('../../../../assets/alert-triangle.png');

export const ErrorMsg = props => {
  const {
    meta: { touched, error },
    showErrorIcon,
  } = props;
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
}

ErrorMsg.propTypes = {
  meta: PropTypes.shape({}),
  showErrorIcon: PropTypes.bool,
}

ErrorMsg.defaultProps = {
  meta: {},
  showErrorIcon: true,
}

export const GooglePlacesInput = props => {
  const {
    headerTitle,
    componentRestrictions,
    onValueChange,
    refs,
    input,
    inlineError,
  } = props;
  const apiConfigObj = getAPIConfig();
  const { googleApiKey } = apiConfigObj;
  const [focussed, setFocussed] = useState(false);
  return (
    <Container>
      <StyledLabel isFocused={focussed || input.value}>{headerTitle}</StyledLabel>
      <GooglePlacesAutocomplete
        placeholder={null}
        suppressDefaultStyles
        minLength={2} // minimum length of text to search
        autoFocus={false}
        ref={instance => refs(instance)}
        returnKeyType="search"
        fetchDetails
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          onValueChange(details, data.description);
          // 'details' is provided when fetchDetails = true
          return [data, details];
        }}
        query={{
          key: googleApiKey,
          components: `country:${componentRestrictions.country[0]}`,
        }}
        textInputProps={{
          ...input,
          text: input.value,
          onChangeText: value => input.onChange(value),
          onFocus: () => setFocussed(true)
        }}
        styles={{
          textInputContainer,
          textInput,
          description,
          listView,
          separator,
          poweredContainer,
          row: item,
          container,
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={0} // debounce the requests in ms.
        listViewDisplayed="auto"
      />
      {inlineError && <View><ErrorMsg {...props} /></View>}
    </Container>
  );
};

GooglePlacesInput.propTypes = {
  headerTitle: PropTypes.string,
  componentRestrictions: PropTypes.shape({
    country: PropTypes.shape([]),
  }),
  onValueChange: PropTypes.func,
  refs: PropTypes.func,
  input: PropTypes.shape({}),
  inlineError: PropTypes.bool,
};

GooglePlacesInput.defaultProps = {
  headerTitle: 'Address Line',
  componentRestrictions: {
    country: [],
  },
  onValueChange: () => {},
  refs: () => {},
  input: {},
  inlineError: false,
};

export default GooglePlacesInput;
