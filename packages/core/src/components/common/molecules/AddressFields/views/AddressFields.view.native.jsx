import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { getAddressFromPlace, getLabelValue } from '@tcp/core/src/utils';
import { Field, change } from 'redux-form';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import TextBox from '../../../atoms/TextBox';
import Select from '../../../atoms/Select';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import {
  InputFieldPhoneNumber,
  InputFieldHalf,
  StateZipCodeContainer,
} from '../styles/AddressFields.style.native';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from '../../../organisms/AddressForm/CountriesAndStates.constants';
import { API_CONFIG } from '../../../../../services/config';

export class AddressFields extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    addressFormLabels: PropTypes.shape({}).isRequired,
    formName: PropTypes.string.isRequired,
    formSection: PropTypes.string,
    loadShipmentMethods: PropTypes.func.isRequired,
    disableCountry: PropTypes.bool,
    showUserName: PropTypes.bool,
    showPhoneNumber: PropTypes.bool,
    showEmailAddress: PropTypes.bool,
    initialValues: PropTypes.shape({}),
    isGuest: PropTypes.bool,
  };

  static defaultProps = {
    formSection: '',
    disableCountry: false,
    showUserName: true,
    showPhoneNumber: true,
    showEmailAddress: true,
    initialValues: {},
    isGuest: true,
  };

  static addressValidationConfig = getStandardConfig([
    'firstName',
    'lastName',
    'addressLine1',
    'addressLine2',
    'city',
    'state',
    'zipCode',
    'country',
    'phoneNumber',
    'emailAddress',
  ]);

  constructor(props) {
    super(props);
    const {
      siteIds: { us },
    } = API_CONFIG;
    this.state = {
      country: us.toUpperCase(),
    };
  }

  handlePlaceSelected = (place, inputValue) => {
    const { dispatch, formName, formSection } = this.props;
    const address = getAddressFromPlace(place, inputValue);
    dispatch(change(formName, `${formSection}.city`, address.city));
    dispatch(change(formName, `${formSection}.zipCode`, address.zip));
    dispatch(change(formName, `${formSection}.state`, address.state));
    dispatch(change(formName, `${formSection}.addressLine1`, address.street));
  };

  getInitialAddressLine1 = initialValues => {
    return (initialValues && initialValues.address && initialValues.address.addressLine1) || '';
  };

  changeShipmentMethods = (e, value) => {
    const { loadShipmentMethods, formName } = this.props;
    if (loadShipmentMethods) {
      loadShipmentMethods({ state: value, formName });
    }
  };

  render() {
    const {
      addressFormLabels,
      formSection,
      disableCountry,
      showUserName,
      showPhoneNumber,
      showEmailAddress,
      initialValues,
      isGuest,
    } = this.props;
    const { country } = this.state;
    const isCA = country === API_CONFIG.siteIds.ca.toUpperCase();
    return (
      <View>
        {showUserName && (
          <>
            <Field
              name="firstName"
              id="firstName"
              label={getLabelValue(addressFormLabels, 'firstName')}
              type="text"
              component={TextBox}
              maxLength={50}
              dataLocator="addnewaddress-firstname"
            />
            <Field
              id="lastName"
              name="lastName"
              label={getLabelValue(addressFormLabels, 'lastName')}
              component={TextBox}
              dataLocator="addnewaddress-lastname"
            />
          </>
        )}
        <Field
          headerTitle={getLabelValue(addressFormLabels, 'addressLine1')}
          component={GooglePlacesInput}
          onValueChange={(data, inputValue) => {
            this.handlePlaceSelected(data, inputValue);
          }}
          initialValue={this.getInitialAddressLine1(initialValues)}
          dataLocator="addnewaddress-addressl1"
          componentRestrictions={{ ...{ country: [country] } }}
          id="addressLine1"
          name="addressLine1"
        />
        <Field
          id="addressLine2"
          name="addressLine2"
          label={getLabelValue(addressFormLabels, 'addressLine2')}
          component={TextBox}
          dataLocator="addnewaddress-addressl2"
        />
        <Field
          id="city"
          name="city"
          label={getLabelValue(addressFormLabels, 'city')}
          component={TextBox}
          dataLocator="addnewaddress-city"
        />
        <StateZipCodeContainer>
          <InputFieldHalf>
            <Field
              id="state"
              name="state"
              component={Select}
              heading={getLabelValue(addressFormLabels, isCA ? 'province' : 'stateLbl')}
              options={isCA ? CAcountriesStatesTable : UScountriesStatesTable}
              onValueChange={() => {
                this.changeShipmentMethods();
              }}
            />
          </InputFieldHalf>
          <InputFieldHalf>
            <Field
              id="zipCode"
              name="zipCode"
              label={getLabelValue(addressFormLabels, isCA ? 'postalCode' : 'zipCode')}
              maxLength={isCA ? 6 : 5}
              component={TextBox}
              dataLocator="addnewaddress-zipcode"
              keyboardType="numeric"
            />
          </InputFieldHalf>
        </StateZipCodeContainer>
        <Field
          id="country"
          name="country"
          component={Select}
          heading={getLabelValue(addressFormLabels, 'country')}
          options={countriesOptionsMap}
          onValueChange={itemValue => {
            this.setState({ country: itemValue });
          }}
          disabled={disableCountry}
        />
        {showPhoneNumber && (
          <InputFieldPhoneNumber>
            <Field
              id="phoneNumber"
              name="phoneNumber"
              label={getLabelValue(addressFormLabels, 'phoneNumber')}
              component={TextBox}
              dataLocator="addnewaddress-phnumber"
              type="tel"
              keyboardType="numeric"
            />
          </InputFieldPhoneNumber>
        )}
        {showEmailAddress && isGuest && (
          <Field
            label={getLabelValue(addressFormLabels, 'emailForOrderUpdates')}
            name="emailAddress"
            id={`${formSection}.emailAddress`}
            component={TextBox}
            dataLocator="email-address-field"
            enableSuccessCheck={false}
          />
        )}
      </View>
    );
  }
}

export default AddressFields;
