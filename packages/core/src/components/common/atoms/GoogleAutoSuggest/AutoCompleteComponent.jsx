import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { requireNamedOnlineModule } from '../../../../utils/resourceLoader';
import TextBox from '../TextBox'; // this comment prevents linting errors

export class AutoCompleteComponent extends PureComponent {
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
      if (AutoCompleteComponent.GOOGLE_PLACE_PARTS[addressType]) {
        const val =
          place.address_components[i][AutoCompleteComponent.GOOGLE_PLACE_PARTS[addressType]];
        address = AutoCompleteComponent.returngetAddress(addressType, val, address);
      }
    }
    if (!address.street_number) {
      const regex = RegExp('^(.*)'`${address.street_name.split(' ', 1)[0]}`);
      const result = regex.exec(inputValue);
      const inputNum = Array.isArray(result) && result[1] && Number(result[1]);

      if (!Number(inputNum) && parseInt(inputNum, 10) === inputNum) {
        address.street_number = inputNum;
      }
    }

    address.street = `${address.street_number} ${address.street_name}`;

    return address;
  }

  static returngetAddress = (addressType, val, address) => {
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
              this.getAutoCompleteConfigObject()
            );
            this.googleAutocomplete.setFields(apiFieldsArray);
            this.googleAutocomplete.addListener('place_changed', this.handleOnPlaceSelected);
          })
          .catch(() => null /* do nothing if unable to load googleAutocomplete */);
      } else {
        this.googleAutocomplete = new window.google.maps.places.Autocomplete(
          refToInputElement,
          this.getAutoCompleteConfigObject()
        );
        this.googleAutocomplete.setFields(apiFieldsArray);
        this.googleAutocomplete.addListener('place_changed', this.handleOnPlaceSelected);
      }
    }
  }

  handleOnPlaceSelected() {
    const { input, onPlaceSelected, meta } = this.props;
    const { touched, error } = meta;
    const inputValue = this.refToInputElement != null && this.refToInputElement.value;
    if (this.refToInputElement != null && input) {
      input.onChange(this.refToInputElement.value);
    }
    if (!(touched && error)) onPlaceSelected(this.googleAutocomplete.getPlace(), inputValue);
  }

  render() {
    const { ...otherProps } = this.props;

    return <TextBox {...otherProps} inputRef={this.attachToInputRef} key={this.inputElementKey} />;
  }

  // --------------- end of private methods --------------- //
}

AutoCompleteComponent.propTypes = {
  types: PropTypes.oneOf(['address']).isRequired,
  componentRestrictions: PropTypes.shape({}).isRequired,
  bounds: PropTypes.shape({}).isRequired,
  apiFields: PropTypes.shape({}).isRequired,
  input: PropTypes.shape({}).isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  meta: PropTypes.shape({}).isRequired,
};

export default AutoCompleteComponent;
