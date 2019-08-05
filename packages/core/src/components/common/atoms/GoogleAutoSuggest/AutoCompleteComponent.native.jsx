import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  StyledLabel,
  textInput,
  textInputContainer,
  description,
  listView,
  separator,
  poweredContainer,
  Container,
} from './AutoCompleteComponent.native.style';

export const GooglePlacesInput = props => {
  const { label } = props;
  const [focussed, setFocussed] = useState(false);
  const onFocus = () => {
    setFocussed(true);
  };
  return (
    <Container>
      {focussed || <StyledLabel>{label}</StyledLabel>}
      <GooglePlacesAutocomplete
        placeholder={null}
        suppressDefaultStyles
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType="search"
        listViewDisplayed="auto"
        fetchDetails
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          return [data, details];
        }}
        getDefaultValue={() => ''}
        query={{
          key: 'AIzaSyDuU66iTcoX2TISQsJV7LrZZeOhIGDDlRw',
          language: 'en', // language of the results
          types: '(cities)', // default: 'geocode'
        }}
        textInputProps={{
          onFocus,
        }}
        styles={{
          textInputContainer,
          textInput,
          description,
          listView,
          separator,
          poweredContainer,
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        debounce={200} // debounce the requests in ms.
      />
    </Container>
  );
};

GooglePlacesInput.propTypes = {
  label: PropTypes.string,
};

GooglePlacesInput.defaultProps = {
  label: '',
};

export default GooglePlacesInput;
