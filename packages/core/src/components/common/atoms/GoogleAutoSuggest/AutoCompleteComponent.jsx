import React from 'react';
import PropTypes from 'prop-types';
import { requireNamedOnlineModule } from '../../../../utils/resourceLoader';
import TextBox from '../TextBox'; // this comment prevents linting errors
import { getCacheData, setCacheData } from '../../../../utils/multipleLocalStorageManagement';

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
export class AutoCompleteComponent extends React.PureComponent {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    componentRestrictions: PropTypes.shape({
      country: PropTypes.string.isRequired,
    }),
    bounds: PropTypes.shape({
      getSouthWest: PropTypes.func,
      getNorthEast: PropTypes.func,
    }),
    apiFields: PropTypes.string,
    onPlaceSelected: PropTypes.func.isRequired,
    input: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    types: ['address'],
    bounds: null,
    apiFields: '',
    componentRestrictions: {},
  };

  static GOOGLE_PLACE_PARTS = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    sublocality_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
  };

  constructor(props) {
    super(props);
    this.googleAutocomplete = null;
    this.refToInputElement = null;
    this.inputElementKey = '0';

    this.attachToInputRef = this.attachToInputRef.bind(this);
    this.handleOnPlaceSelected = this.handleOnPlaceSelected.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { types, componentRestrictions, bounds } = this.props;
    if (!this.googleAutocomplete) return;

    if (types !== nextProps.types) {
      this.googleAutocomplete.setTypes(nextProps.types);
    }
    if (bounds !== nextProps.bounds) {
      this.googleAutocomplete.setBounds(nextProps.bounds);
    }

    if (componentRestrictions !== nextProps.componentRestrictions) {
      if (nextProps.componentRestrictions) {
        this.googleAutocomplete.setComponentRestrictions(nextProps.componentRestrictions);
      } else {
        this.inputElementKey = this.inputElementKey === '0' ? '1' : '0';
      }
    }
  }

  // --------------- private methods --------------- //

  getAutoCompleteConfigObject() {
    const { types, bounds, componentRestrictions } = this.props;
    return componentRestrictions ? { types, bounds, componentRestrictions } : { types, bounds };
  }

  attachToInputRef(refToInputElement) {
    this.refToInputElement = refToInputElement; // remember the DOM element behind the input element we render
    const { apiFields } = this.props;
    const apiFieldsArray = apiFields && apiFields.split('|');
    if (refToInputElement !== null) {
      // can be null for example when React unmounts this components
      if (!this.googleAutocomplete) {
        // if the googleAutocomplete object was not created
        requireNamedOnlineModule('google.maps')
          .then(() => {
            this.googleAutocomplete = new window.google.maps.places.Autocomplete(
              refToInputElement,
              this.getAutoCompleteConfigObject(this.props)
            );
            this.googleAutocomplete.setFields(apiFieldsArray);
            this.googleAutocomplete.addListener('place_changed', this.handleOnPlaceSelected);
          })
          .catch(() => null /* do nothing if unable to load googleAutocomplete */);
      } else {
        this.googleAutocomplete = new window.google.maps.places.Autocomplete(
          refToInputElement,
          this.getAutoCompleteConfigObject(this.props)
        );
        this.googleAutocomplete.setFields(apiFieldsArray);
        this.googleAutocomplete.addListener('place_changed', this.handleOnPlaceSelected);
      }
    }
  }

  handleOnPlaceSelected() {
    const { input, onPlaceSelected } = this.props;
    const inputValue = this.refToInputElement != null && this.refToInputElement.value;
    if (this.refToInputElement != null && input) {
      input.onChange(this.refToInputElement.value);
    }
    onPlaceSelected(this.googleAutocomplete.getPlace(), inputValue);
  }

  render() {
    const { ...otherProps } = this.props;

    return <TextBox {...otherProps} inputRef={this.attachToInputRef} key={this.inputElementKey} />;
  }

  // --------------- end of private methods --------------- //
}
