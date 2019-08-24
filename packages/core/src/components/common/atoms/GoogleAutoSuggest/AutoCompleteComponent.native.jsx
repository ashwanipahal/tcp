import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { getAPIConfig } from '@tcp/core/src/utils';
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
  const { headerTitle, componentRestrictions, onValueChange } = props;
  const [focussed, setFocussed] = useState(false);
  const onFocus = () => {
    setFocussed(true);
  };

  // const apiConfigObj = getAPIConfig();
  // eslint-disable-next-line
  const map_api_key = 'AIzaSyAd-jljPEQ6kgrLRJuN-ENKypW9K6sbQgc';
  // const { map_api_key } = apiConfigObj;
  return (
    <Container>
      <StyledLabel isFocused={focussed}>{headerTitle}</StyledLabel>
      <GooglePlacesAutocomplete
        placeholder={null}
        suppressDefaultStyles
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType="search"
        listViewDisplayed={false}
        fetchDetails
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          setFocussed(true);
          onValueChange(details, data.description);
          // 'details' is provided when fetchDetails = true
          return [data, details];
        }}
        getDefaultValue={() => ''}
        query={{
          key: map_api_key,
          language: 'en', // language of the results
          types: '(cities)', // default: 'geocode'
          components: `country:${componentRestrictions.country[0]}`,
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
          row: item,
          container,
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200} // debounce the requests in ms.
      />
    </Container>
  );
};

GooglePlacesInput.GOOGLE_PLACE_PARTS = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  sublocality_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name',
};

GooglePlacesInput.getAddressFromPlace = (place, inputValue) => {
  let address = {
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    steet_number: '',
    street_name: '',
  };
  if (typeof place.address_components === 'undefined') {
    return address;
  }
  for (let i = 0; i < place.address_components.length; i += 1) {
    const addressType = place.address_components[i].types[0];
    if (GooglePlacesInput.GOOGLE_PLACE_PARTS[addressType]) {
      const val = place.address_components[i][GooglePlacesInput.GOOGLE_PLACE_PARTS[addressType]];
      address = GooglePlacesInput.returngetAddress(addressType, val, address);
    }
  }
  if (!address.street_number) {
    const regex = new RegExp(`^(.*)${address.street_name.split(' ', 1)[0]}`);
    const result = regex.exec(inputValue);
    const inputNum = Array.isArray(result) && result[1] && Number(result[1]);

    if (!Number(inputNum) && parseInt(inputNum, 10) === inputNum) {
      address.street_number = inputNum;
    }
  }

  address.street = `${address.street_number} ${address.street_name}`;

  return address;
};

GooglePlacesInput.returngetAddress = (addressType, val, address) => {
  const addressRef = Object.assign({}, address);
  switch (addressType) {
    case 'street_number':
      addressRef.street_number = val;
      break;
    case 'route':
      addressRef.street_name = val;
      break;
    case 'locality':
      addressRef.city = val;
      break;
    case 'sublocality_level_1':
      addressRef.city = val;
      break;
    case 'administrative_area_level_1':
      addressRef.state = val;
      break;
    case 'country':
      addressRef.country = val;
      break;
    case 'postal_code':
      addressRef.zip = val;
      break;
    default:
      addressRef.zip = val;
  }
  return addressRef;
};

GooglePlacesInput.propTypes = {
  headerTitle: PropTypes.string,
  componentRestrictions: PropTypes.shape({
    country: PropTypes.shape([]),
  }),
  onValueChange: PropTypes.func,
};

GooglePlacesInput.defaultProps = {
  headerTitle: 'Address Line',
  componentRestrictions: {
    country: [],
  },
  onValueChange: () => {},
};

export default GooglePlacesInput;
