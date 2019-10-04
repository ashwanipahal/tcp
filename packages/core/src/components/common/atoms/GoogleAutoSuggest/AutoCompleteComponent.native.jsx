import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getAPIConfig } from '@tcp/core/src/utils';
import BodyCopy from '../BodyCopy';
import Image from '../Image';
import { StyledErrorWrapper, ViewWithSpacing } from '../styledWrapper/styledWrapper.native';
import { getCacheData, setCacheData } from '../../../../utils/multipleLocalStorageManagement';
import { requireNamedOnlineModule } from '../../../../utils/resourceLoader';
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

export function getAddressLocationInfo(address) {
  const googleApiStoredDataObj = getCacheData('geocode-response', address);
  if (googleApiStoredDataObj) {
    // Available in storage, don't trigger the google API call
    return new Promise(resolve => {
      resolve({
        lat: googleApiStoredDataObj.lat,
        lng: googleApiStoredDataObj.lng,
        country: googleApiStoredDataObj.country,
      });
    });
  }
  return requireNamedOnlineModule('google.maps').then(() => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise(resolve => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const country = results[0].address_components.find(component => {
            return component.types && component.types.find(type => type === 'country');
          });
          const timeStamp = new Date().getTime();
          const storeDataObject = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            country: country && country.short_name,
          };
          setCacheData({
            key: 'geocode-response',
            storageKey: address,
            storageValue: { ...storeDataObject, timeStamp },
          });
          resolve(storeDataObject);
        } else {
          resolve({ error: status });
        }
      });
    });
  });
}

export class GooglePlacesInput extends PureComponent {
  constructor(props) {
    super(props);
    const apiConfigObj = getAPIConfig();
    const { googleApiKey } = apiConfigObj;
    this.googleApiKey = googleApiKey;
    this.touched = false;
    this.active = false;
    this.state = {
      listViewDisplayed: false,
      active: false,
      touched: false,
    };
  }

  onFocus = () => {
    this.setState({
      listViewDisplayed: 'auto',
      active: true,
    });
  };

  onBlur = () => {
    setTimeout(() => {
      this.setState({
        active: false,
        touched: true,
        listViewDisplayed: false,
      });
    }, 0);
  };

  onPress = (data, details = null) => {
    const { onValueChange } = this.props;
    this.setState(
      {
        listViewDisplayed: false,
      },
      () => {
        onValueChange(details, data.description);
      }
    );
  };

  render() {
    const {
      headerTitle,
      componentRestrictions,
      onSubmitEditing,
      onEndEditing,
      refs,
      onChangeText,
      input,
      initialValue,
      meta: { error },
      clearButtonMode,
    } = this.props;
    const { listViewDisplayed, active, touched } = this.state;
    return (
      <Container>
        <StyledLabel isFocused={active || input.value}>{headerTitle}</StyledLabel>
        <GooglePlacesAutocomplete
          placeholder={null}
          suppressDefaultStyles
          minLength={2} // minimum length of text to search
          autoFocus={false}
          ref={instance => refs(instance)}
          returnKeyType="search"
          fetchDetails
          renderDescription={row => row.description}
          listViewDisplayed={listViewDisplayed}
          onPress={this.onPress}
          query={{
            key: this.googleApiKey,
            components: `country:${componentRestrictions.country[0]}`,
            types: 'address',
          }}
          text={input.value}
          getDefaultValue={() => initialValue}
          textInputProps={{
            name: input.name,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            clearButtonMode,
            onSubmitEditing: text => {
              onSubmitEditing(text.nativeEvent.text);
            },
            onEndEditing: text => {
              onEndEditing(text.nativeEvent.text);
            },
            onChangeText: text => {
              input.onChange(text);
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
        />
        {touched && !active && error ? (
          <StyledErrorWrapper>
            <ViewWithSpacing spacingStyles="margin-right-XXXS">
              <Image source={errorIcon} width="15px" height="15px" />
            </ViewWithSpacing>
            <BodyCopy
              mobilefontFamily={['secondary']}
              fontWeight="semibold"
              fontSize="fs12"
              text={error}
              color="error"
            />
          </StyledErrorWrapper>
        ) : null}
      </Container>
    );
  }
}

GooglePlacesInput.propTypes = {
  headerTitle: PropTypes.string,
  componentRestrictions: PropTypes.shape({
    country: PropTypes.shape([]),
  }),
  onValueChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onEndEditing: PropTypes.func,
  refs: PropTypes.func,
  onChangeText: PropTypes.func,
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  initialValue: PropTypes.string,
  clearButtonMode: PropTypes.string,
};

GooglePlacesInput.defaultProps = {
  headerTitle: 'Address Line',
  componentRestrictions: {
    country: [],
  },
  onValueChange: () => {},
  onSubmitEditing: () => {},
  onEndEditing: () => {},
  refs: () => {},
  onChangeText: () => {},
  input: {},
  meta: {},
  initialValue: '',
  clearButtonMode: 'while-editing',
};

export default GooglePlacesInput;
