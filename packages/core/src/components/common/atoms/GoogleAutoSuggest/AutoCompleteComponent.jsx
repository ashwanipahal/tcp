import React from 'react';
import { requireNamedOnlineModule } from './resourceLoader';
import TextBox from '../TextBox'; // this comment prevents linting errors

/* global google  - getAddressLocationInfo this componet is used for get the address suggestion */

export function getAddressLocationInfo(address) {
  return requireNamedOnlineModule('google.maps').then(() => {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const storeDataObject = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          resolve(storeDataObject);
        } else {
          reject(status);
        }
      });
    });
  });
}

export class AutoCompleteComponent extends React.Component {
  static defaultProps = {
    types: ['address'],
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

  static getAddressFromPlace(place, inputValue) {
    const address = { street: '', city: '', state: '', country: '', zip: '' };
    let streetNumber = '';
    let streetName = '';

    if (typeof place.address_components === 'undefined') {
      return address;
    }
    for (let i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types[0];
      if (AutoCompleteComponent.GOOGLE_PLACE_PARTS[addressType]) {
        switch (addressType) {
          case 'street_number':
            streetNumber = val;
            break;
          case 'route':
            streetName = val;
            break;
          case 'locality':
            address.city = val;
            break;
          case 'sublocality_level_1':
            address.city = val;
            break;
          case 'administrative_area_level_1':
            address.state = val;
            break;
          case 'country':
            address.country = val;
            break;
          case 'postal_code':
            address.zip = val;
            break;
        }
      }
    }

    if (!streetNumber) {
      let regex = RegExp('^(.*)' + streetName.split(' ', 1)[0]);
      let result = regex.exec(inputValue);
      let inputNum = Array.isArray(result) && result[1] && Number(result[1]);

      if (!isNaN(inputNum) && parseInt(inputNum, 10) === inputNum) {
        streetNumber = inputNum;
      }
    }

    address.street = `${streetNumber} ${streetName}`;

    return address;
  }

  constructor(props) {
    super(props);
    this.googleAutocomplete = null;
    this.refToInputElement = null;
    this.inputElementKey = '0';

    this.attachToInputRef = this.attachToInputRef.bind(this);
    this.handleOnPlaceSelected = this.handleOnPlaceSelected.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!this.googleAutocomplete) return;

    if (this.props.types !== nextProps.types) {
      this.googleAutocomplete.setTypes(nextProps.types);
    }
    if (this.props.bounds !== nextProps.bounds) {
      this.googleAutocomplete.setBounds(nextProps.bounds);
    }

    if (this.props.componentRestrictions !== nextProps.componentRestrictions) {
      if (nextProps.componentRestrictions) {
        this.googleAutocomplete.setComponentRestrictions(nextProps.componentRestrictions);
      } else {
        this.inputElementKey = this.inputElementKey === '0' ? '1' : '0';
      }
    }
  }

  render() {
    let {
      //  not used, but here to prevent inclusion in ...otherProps
      onPlaceSelected,
      types,
      componentRestrictions,
      bounds, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    return <TextBox {...otherProps} inputRef={this.attachToInputRef} key={this.inputElementKey} />;
  }

  // --------------- private methods --------------- //

  getAutoCompleteConfigObject(props) {
    let { types, bounds } = props;
    let componentRestrictions = props.componentRestrictions;
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
            this.googleAutocomplete = new google.maps.places.Autocomplete(
              refToInputElement,
              this.getAutoCompleteConfigObject(this.props)
            );
            this.googleAutocomplete.setFields(apiFieldsArray);
            this.googleAutocomplete.addListener('place_changed', this.handleOnPlaceSelected);
          })
          .catch(() => null /* do nothing if unable to load googleAutocomplete */);
      } else {
        this.googleAutocomplete = new google.maps.places.Autocomplete(
          refToInputElement,
          this.getAutoCompleteConfigObject(this.props)
        );
        this.googleAutocomplete.setFields(apiFieldsArray);
        this.googleAutocomplete.addListener('place_changed', this.handleOnPlaceSelected);
      }
    }
  }

  handleOnPlaceSelected() {
    let inputValue = this.refToInputElement != null && this.refToInputElement.value;
    this.refToInputElement != null &&
      this.props.input &&
      this.props.input.onChange(this.refToInputElement.value);
    this.props.onPlaceSelected(this.googleAutocomplete.getPlace(), inputValue);
  }

  // --------------- end of private methods --------------- //
}
