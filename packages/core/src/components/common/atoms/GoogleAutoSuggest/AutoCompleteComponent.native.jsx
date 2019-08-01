import React from 'react';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const GooglePlacesInput = props => {
  const { text } = props;
  return (
    <GooglePlacesAutocomplete
      placeholder={text}
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
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDuU66iTcoX2TISQsJV7LrZZeOhIGDDlRw',
        language: 'en', // language of the results
        types: '(cities)', // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
      }}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};

GooglePlacesInput.propTypes = {
  text: PropTypes.string,
};

GooglePlacesInput.defaultProps = {
  text: 'Button',
};

export default GooglePlacesInput;
