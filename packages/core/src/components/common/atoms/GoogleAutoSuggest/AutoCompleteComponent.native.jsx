import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getAPIConfig } from '@tcp/core/src/utils';
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

export const GooglePlacesInput = props => {
  const {
    headerTitle,
    componentRestrictions,
    onValueChange,
    initialValue,
    onSubmitEditing,
    onEndEditing,
    refs,
    onChangeText,
  } = props;
  const [focussed, setFocussed] = useState(false);
  const onFocus = () => {
    setFocussed(true);
  };

  const setValue = value => {
    if (value) setFocussed(true);
    return value;
  };

  const apiConfigObj = getAPIConfig();
  const { googleApiKey } = apiConfigObj;
  return (
    <Container>
      <StyledLabel isFocused={focussed}>{headerTitle}</StyledLabel>
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
          setFocussed(true);
          onValueChange(details, data.description);
          // 'details' is provided when fetchDetails = true
          return [data, details];
        }}
        getDefaultValue={() => setValue(initialValue)}
        query={{
          key: googleApiKey,
          components: `country:${componentRestrictions.country[0]}`,
        }}
        textInputProps={{
          onFocus,
          onSubmitEditing: text => {
            onSubmitEditing(text.nativeEvent.text);
          },
          onEndEditing: text => {
            onEndEditing(text.nativeEvent.text);
          },
          onChangeText: text => {
            onChangeText(text);
          },
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
        listViewDisplayed={false}
      />
    </Container>
  );
};

GooglePlacesInput.propTypes = {
  headerTitle: PropTypes.string,
  componentRestrictions: PropTypes.shape({
    country: PropTypes.shape([]),
  }),
  onValueChange: PropTypes.func,
  initialValue: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  onEndEditing: PropTypes.func,
  refs: PropTypes.func,
  onChangeText: PropTypes.func,
};

GooglePlacesInput.defaultProps = {
  headerTitle: 'Address Line',
  componentRestrictions: {
    country: [],
  },
  onValueChange: () => {},
  initialValue: '',
  onSubmitEditing: () => {},
  onEndEditing: () => {},
  refs: () => {},
  onChangeText: () => {},
};

export default GooglePlacesInput;
